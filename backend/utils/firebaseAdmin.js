import admin from 'firebase-admin';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

// Try to load from firebase-config.json file first
const configPath = path.join(__dirname, '../firebase-config.json');
if (fs.existsSync(configPath)) {
  try {
    serviceAccount = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    
    // Fix private key formatting - convert escaped newlines to actual newlines
    if (serviceAccount.private_key && typeof serviceAccount.private_key === 'string') {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }
    
    console.log('✅ Firebase config loaded from firebase-config.json');
  } catch (err) {
    console.error('Invalid firebase-config.json:', err);
    process.exit(1);
  }
}

// Fall back to environment variable if file doesn't exist
if (!serviceAccount) {
  const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!serviceAccountRaw) {
    console.error('Missing FIREBASE_SERVICE_ACCOUNT. Create backend/firebase-config.json or set env variable.');
    process.exit(1);
  }

  try {
    serviceAccount = JSON.parse(serviceAccountRaw);
    // Fix private key formatting here too
    if (serviceAccount.private_key && typeof serviceAccount.private_key === 'string') {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }
  } catch (err) {
    console.error('Invalid FIREBASE_SERVICE_ACCOUNT JSON.');
    throw err;
  }
}

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default app;
