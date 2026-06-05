import express from 'express';
import MedicalRecord from '../models/MedicalRecord.js';
import User from '../models/User.js';
import { BlockchainRecord, MedicalRecordsBlockchain, createMedicalDataHash } from '../utils/blockchain.js';

const router = express.Router();

// Store blockchain instance
const blockchain = new MedicalRecordsBlockchain();

// Create a new medical record
router.post('/', async (req, res) => {
  try {
    const { recordType, data, notes } = req.body;
    const userId = req.user.uid;

    // Validate input
    if (!recordType || !data) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create blockchain record
    const block = await blockchain.addRecord(
      { userId, recordType, data, timestamp: Date.now() }
    );

    // Create database record
    const medicalRecord = new MedicalRecord({
      userId,
      recordType,
      data,
      blockchainHash: block.hash,
      notes,
      blockchainVerified: true,
      transactionHash: block.hash,
      status: 'verified'
    });

    await medicalRecord.save();

    // Update user's medical records
    await User.findOneAndUpdate(
      { uid: userId },
      { $push: { medicalRecords: medicalRecord._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      record: medicalRecord,
      blockchainVerification: {
        hash: block.hash,
        verified: block.verifyIntegrity(),
        timestamp: block.timestamp
      }
    });
  } catch (error) {
    console.error('Error creating medical record:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all medical records for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const records = await MedicalRecord.find({ userId: req.params.userId }).sort({ timestamp: -1 });
    res.json({
      success: true,
      records,
      count: records.length
    });
  } catch (error) {
    console.error('Error fetching medical records:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get record by ID
router.get('/:recordId', async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.recordId);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    // Verify blockchain record
    const blockchainRecord = await blockchain.getBlockByHash(record.blockchainHash);
    const isValid = blockchainRecord && blockchainRecord.verifyIntegrity();

    res.json({
      success: true,
      record,
      blockchainVerification: {
        isValid,
        hash: blockchainRecord?.hash,
        timestamp: blockchainRecord?.timestamp
      }
    });
  } catch (error) {
    console.error('Error fetching medical record:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update medical record
router.put('/:recordId', async (req, res) => {
  try {
    const { data, notes, prediction } = req.body;
    const userId = req.user.uid;

    const record = await MedicalRecord.findById(req.params.recordId);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    if (record.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Create new blockchain record for updated data
    if (data) {
      const block = await blockchain.addRecord(
        { userId, recordType: record.recordType, data, timestamp: Date.now() }
      );

      record.blockchainHash = block.hash;
      record.transactionHash = block.hash;
      record.data = data;
    }

    if (notes) record.notes = notes;
    if (prediction) record.prediction = prediction;

    record.blockchainVerified = true;
    record.status = 'verified';

    await record.save();

    res.json({
      success: true,
      record,
      message: 'Record updated and verified on blockchain'
    });
  } catch (error) {
    console.error('Error updating medical record:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete medical record
router.delete('/:recordId', async (req, res) => {
  try {
    const userId = req.user.uid;
    const record = await MedicalRecord.findById(req.params.recordId);

    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    if (record.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await MedicalRecord.findByIdAndDelete(req.params.recordId);
    await User.findOneAndUpdate(
      { uid: userId },
      { $pull: { medicalRecords: req.params.recordId } }
    );

    res.json({ success: true, message: 'Record deleted' });
  } catch (error) {
    console.error('Error deleting medical record:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get blockchain verification status
router.get('/:recordId/verify', async (req, res) => {
  try {
    const record = await MedicalRecord.findById(req.params.recordId);
    if (!record) {
      return res.status(404).json({ error: 'Record not found' });
    }

    const blockchainRecord = await blockchain.getBlockByHash(record.blockchainHash);
    const isValid = blockchainRecord && blockchainRecord.verifyIntegrity();

    res.json({
      success: true,
      recordId: req.params.recordId,
      blockchainVerified: record.blockchainVerified,
      isValid,
      hash: record.blockchainHash,
      transactionHash: record.transactionHash,
      timestamp: record.timestamp,
      message: isValid ? 'Record verified on blockchain' : 'Record verification failed'
    });
  } catch (error) {
    console.error('Error verifying record:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
