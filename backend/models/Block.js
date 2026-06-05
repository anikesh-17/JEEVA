import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
  index: {
    type: Number,
    required: true
  },
  hash: {
    type: String,
    required: true,
    unique: true
  },
  previousHash: {
    type: String,
    required: true
  },
  recordData: {
    type: Object,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  },
  nonce: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true });

const Block = mongoose.models.Block || mongoose.model('Block', BlockSchema);
export default Block;
