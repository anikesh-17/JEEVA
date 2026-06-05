import crypto from 'crypto';
import Block from '../models/Block.js';

// Blockchain utility for medical records verification
export class BlockchainRecord {
  constructor(recordData) {
    this.recordData = recordData;
    this.hash = null;
    this.previousHash = null;
    this.timestamp = Date.now();
    this.nonce = 0;
    this.index = 0;
  }

  // Generate SHA-256 hash of the record
  calculateHash() {
    const dataString = JSON.stringify(this.recordData);
    return crypto
      .createHash('sha256')
      .update(dataString + this.previousHash + this.timestamp + this.nonce)
      .digest('hex');
  }

  // Proof of work - simple mining with difficulty
  proofOfWork(difficulty = 2) {
    while (this.calculateHash().substring(0, difficulty) !== '0'.repeat(difficulty)) {
      this.nonce++;
    }
    this.hash = this.calculateHash();
    console.log(`Block mined: ${this.hash}`);
  }

  // Verify the integrity of the record
  verifyIntegrity() {
    return this.hash === this.calculateHash();
  }

  // Get record metadata for blockchain
  getMetadata() {
    return {
      hash: this.hash,
      timestamp: this.timestamp,
      nonce: this.nonce,
      dataHash: crypto
        .createHash('sha256')
        .update(JSON.stringify(this.recordData))
        .digest('hex')
    };
  }
}

// Blockchain chain for managing records using MongoDB
export class MedicalRecordsBlockchain {
  constructor() {
    this.difficulty = 2;
  }

  // Add a new block to the chain (persisted in MongoDB)
  async addRecord(recordData, previousHash = null) {
    const lastBlock = await Block.findOne().sort({ index: -1 });
    const nextIndex = lastBlock ? lastBlock.index + 1 : 0;
    const finalPreviousHash = previousHash || (lastBlock ? lastBlock.hash : '0');

    const block = new BlockchainRecord(recordData);
    block.index = nextIndex;
    block.previousHash = finalPreviousHash;
    block.proofOfWork(this.difficulty);

    const dbBlock = new Block({
      index: block.index,
      hash: block.hash,
      previousHash: block.previousHash,
      recordData: block.recordData,
      timestamp: block.timestamp,
      nonce: block.nonce
    });
    await dbBlock.save();

    return block;
  }

  // Verify the entire chain
  async verifyChain() {
    const dbBlocks = await Block.find().sort({ index: 1 });
    for (let i = 1; i < dbBlocks.length; i++) {
      const dbCurr = dbBlocks[i];
      const dbPrev = dbBlocks[i - 1];

      const currentBlock = new BlockchainRecord(dbCurr.recordData);
      currentBlock.hash = dbCurr.hash;
      currentBlock.previousHash = dbCurr.previousHash;
      currentBlock.timestamp = dbCurr.timestamp;
      currentBlock.nonce = dbCurr.nonce;
      currentBlock.index = dbCurr.index;

      if (!currentBlock.verifyIntegrity()) {
        console.error(`Block ${i} hash mismatch`);
        return false;
      }
      if (currentBlock.previousHash !== dbPrev.hash) {
        console.error(`Block ${i} previous hash mismatch`);
        return false;
      }
    }
    return true;
  }

  // Get block by hash
  async getBlockByHash(hash) {
    if (!hash) return null;
    const dbBlock = await Block.findOne({ hash });
    if (!dbBlock) return null;

    const block = new BlockchainRecord(dbBlock.recordData);
    block.hash = dbBlock.hash;
    block.previousHash = dbBlock.previousHash;
    block.timestamp = dbBlock.timestamp;
    block.nonce = dbBlock.nonce;
    block.index = dbBlock.index;
    return block;
  }

  // Get all blocks
  async getChain() {
    const dbBlocks = await Block.find().sort({ index: 1 });
    return dbBlocks.map(dbBlock => {
      const block = new BlockchainRecord(dbBlock.recordData);
      block.hash = dbBlock.hash;
      block.previousHash = dbBlock.previousHash;
      block.timestamp = dbBlock.timestamp;
      block.nonce = dbBlock.nonce;
      block.index = dbBlock.index;
      return block;
    });
  }

  async getChainLength() {
    return await Block.countDocuments();
  }
}

// Create hash for medical data
export const createMedicalDataHash = (data) =>
  crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');

export const verifyMedicalDataIntegrity = (data, hash) =>
  createMedicalDataHash(data) === hash;
