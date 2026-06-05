import express from 'express';
import User from '../models/User.js';
import { MedicalRecordsBlockchain } from '../utils/blockchain.js';

const router = express.Router();
const blockchain = new MedicalRecordsBlockchain();

const defaultProfile = {
  age: 32,
  gender: 'Male',
  contact: '+91 1234567890',
  bloodGroup: 'O+',
  allergies: ['Penicillin', 'Peanuts'],
  vitals: {
    bp: '120/80',
    heartRate: '72 bpm',
    spO2: '98%',
    temp: '98.6°F',
    weight: '75 kg',
    height: '178 cm',
    bmi: '23.7',
  },
  history: [
    { year: '2023', condition: 'Appendectomy', type: 'Surgery', status: 'Resolved' },
    { year: '2021', condition: 'Mild Asthma', type: 'Chronic', status: 'Ongoing' },
    { year: '2019', condition: 'Viral Fever', type: 'Acute', status: 'Recovered' },
  ],
  medications: [
    { name: 'Amoxicillin', dose: '500mg', freq: 'Twice Daily', status: 'Active' },
    { name: 'Paracetamol', dose: '650mg', freq: 'SOS', status: 'Active' },
  ],
  appointments: [
    { date: '12 Oct 2024', doctor: 'Dr. Sharma', dept: 'Cardiology', type: 'Follow-up', time: '10:00 AM' },
    { date: '05 Nov 2024', doctor: 'Dr. Gupta', dept: 'General', type: 'Check-up', time: '11:30 AM' },
  ],
};

router.get('/profile', async (req, res) => {
  try {
    const { uid, email, name, picture } = req.user;
    const displayName = req.user.name || req.user.displayName || name || email;
    const photoURL = req.user.picture || req.user.photoURL || picture || '';

    const user = await User.findOneAndUpdate(
      { uid },
      {
        $setOnInsert: {
          uid,
          email,
          displayName,
          photoURL,
          profile: defaultProfile,
          settings: {
            darkMode: false,
            emailAlerts: true,
            smsAlerts: false
          }
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    res.json({ ok: true, user });
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.get('/settings', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid }).lean();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ ok: true, settings: user.settings || { darkMode: false, emailAlerts: true, smsAlerts: false } });
  } catch (err) {
    console.error('Failed to fetch settings:', err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/settings', async (req, res) => {
  try {
    const { uid } = req.user;
    const { darkMode, emailAlerts, smsAlerts } = req.body;

    const user = await User.findOneAndUpdate(
      { uid },
      { 
        $set: { 
          'settings.darkMode': darkMode,
          'settings.emailAlerts': emailAlerts,
          'settings.smsAlerts': smsAlerts
        } 
      },
      { new: true }
    ).lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ ok: true, settings: user.settings });
  } catch (err) {
    console.error('Failed to update settings:', err);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

router.get('/appointments', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid }).lean();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ ok: true, appointments: user.profile.appointments || [] });
  } catch (err) {
    console.error('Failed to fetch appointments:', err);
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

router.post('/predictions', async (req, res) => {
  try {
    const { endpoint, features, prediction, result, probability } = req.body;
    if (!endpoint || !Array.isArray(features)) {
      return res.status(400).json({ error: 'Invalid prediction payload' });
    }

    const user = await User.findOne({ uid: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Mine blockchain block for this prediction record
    const block = await blockchain.addRecord({
      userId: req.user.uid,
      endpoint,
      features,
      prediction,
      result,
      probability: probability || '',
      timestamp: Date.now()
    });

    const predictionRecord = {
      endpoint,
      features,
      prediction,
      result,
      probability: probability || '',
      blockchainHash: block.hash,
      blockchainVerified: true,
      transactionHash: block.hash,
      createdAt: new Date(),
    };

    user.predictions.push(predictionRecord);
    await user.save();

    res.json({ ok: true, prediction: predictionRecord });
  } catch (err) {
    console.error('Failed to store prediction:', err);
    res.status(500).json({ error: 'Failed to store prediction' });
  }
});

router.get('/predictions', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid }).lean();
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ ok: true, predictions: user.predictions || [] });
  } catch (err) {
    console.error('Failed to fetch predictions:', err);
    res.status(500).json({ error: 'Failed to fetch predictions' });
  }
});

router.get('/predictions/:predictionId/verify', async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.user.uid });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const prediction = user.predictions.id(req.params.predictionId);
    if (!prediction) {
      return res.status(404).json({ error: 'Prediction record not found' });
    }

    const blockchainRecord = await blockchain.getBlockByHash(prediction.blockchainHash);
    const isValid = blockchainRecord && blockchainRecord.verifyIntegrity();

    res.json({
      success: true,
      predictionId: req.params.predictionId,
      blockchainVerified: prediction.blockchainVerified,
      isValid,
      hash: prediction.blockchainHash,
      transactionHash: prediction.transactionHash,
      timestamp: blockchainRecord?.timestamp || prediction.createdAt,
      message: isValid ? 'Prediction verified on blockchain' : 'Blockchain hash verification failed'
    });
  } catch (err) {
    console.error('Verification failed:', err);
    res.status(500).json({ error: 'Verification failed' });
  }
});

router.put('/profile', async (req, res) => {
  try {
    const { uid } = req.user;
    const updateData = req.body;

    const user = await User.findOneAndUpdate(
      { uid },
      { $set: { profile: updateData } },
      { new: true }
    ).lean();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ ok: true, user });
  } catch (err) {
    console.error('Failed to update profile:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
