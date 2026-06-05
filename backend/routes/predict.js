import express from 'express';
import MedicalRecord from '../models/MedicalRecord.js';

const router = express.Router();

// Get prediction endpoints
router.post('/diabetes', async (req, res) => {
  try {
    const { glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age } = req.body;
    
    // Mock prediction - integrate with ML service in production
    const risk = Math.random();
    const riskLevel = risk < 0.3 ? 'Low' : risk < 0.7 ? 'Moderate' : 'High';
    
    res.json({
      riskLevel,
      probability: risk,
      recommendations: [
        'Maintain a healthy diet',
        'Exercise regularly',
        'Monitor blood glucose levels',
        'Schedule regular check-ups'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/heart', async (req, res) => {
  try {
    const { age, sex, restingBP, cholesterol, maxHR } = req.body;
    
    // Mock prediction - integrate with ML service in production
    const risk = Math.random();
    const riskLevel = risk < 0.3 ? 'Low Risk' : risk < 0.7 ? 'Moderate Risk' : 'High Risk';
    
    res.json({
      riskLevel,
      probability: risk,
      recommendations: [
        'Monitor blood pressure regularly',
        'Reduce sodium intake',
        'Increase physical activity',
        'Consult with cardiologist'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/breast', async (req, res) => {
  try {
    const { radius_mean, texture_mean, smoothness_mean } = req.body;
    
    // Mock prediction - integrate with ML service in production
    const confidence = Math.random();
    const classification = confidence < 0.5 ? 'Benign' : 'Malignant';
    
    res.json({
      classification,
      confidence,
      recommendations: [
        'Seek second opinion from oncologist',
        'Schedule mammography',
        'Discuss treatment options',
        'Consider genetic testing'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/parkinson', async (req, res) => {
  try {
    const { fo, fhi, jitter_percent, shimmer } = req.body;
    
    // Mock prediction - integrate with ML service in production
    const confidence = Math.random();
    const status = confidence < 0.5 ? 'Healthy' : 'Parkinson\'s Detected';
    
    res.json({
      status,
      confidence,
      recommendations: [
        'Consult with neurologist',
        'Perform additional testing',
        'Consider speech therapy',
        'Monitor symptoms regularly'
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
