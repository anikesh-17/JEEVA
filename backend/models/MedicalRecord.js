import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  recordType: {
    type: String,
    enum: ['diabetes', 'heart', 'breast', 'parkinson', 'general'],
    required: true
  },
  data: {
    type: Object,
    required: true
  },
  prediction: {
    type: Object,
    default: null
  },
  blockchainHash: {
    type: String,
    unique: true,
    sparse: true,
    default: null
  },
  blockchainVerified: {
    type: Boolean,
    default: false
  },
  transactionHash: {
    type: String,
    sparse: true,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now,
    index: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'failed'],
    default: 'pending'
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true });

export default mongoose.model('MedicalRecord', medicalRecordSchema);
