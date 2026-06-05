import crypto from 'crypto';

/**
 * Pure blockchain cryptographic logic (no DB dependencies).
 * Database operations are handled by MedicalRecordsBlockchain in the backend.
 */

export class BlockchainRecord {
  constructor(recordData) {
    this.recordData = recordData;
    this.hash = null;
    this.previousHash = null;
    this.timestamp = Date.now();
    this.nonce = 0;
    this.index = 0;
  }

  calculateHash() {
    const dataString = JSON.stringify(this.recordData);
    return crypto
      .createHash('sha256')
      .update(dataString + this.previousHash + this.timestamp + this.nonce)
      .digest('hex');
  }

  proofOfWork(difficulty = 2) {
    while (this.calculateHash().substring(0, difficulty) !== '0'.repeat(difficulty)) {
      this.nonce++;
    }
    this.hash = this.calculateHash();
    console.log(`Block mined: ${this.hash}`);
  }

  verifyIntegrity() {
    return this.hash === this.calculateHash();
  }

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

// SHA-256 hash helper for medical data
export const createMedicalDataHash = (data) =>
  crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');

export const verifyMedicalDataIntegrity = (data, hash) =>
  createMedicalDataHash(data) === hash;
