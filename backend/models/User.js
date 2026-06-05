import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  id: String,
  date: String,
  doctor: String,
  dept: String,
  type: String,
  time: String,
}, { _id: false });

const MedicationSchema = new mongoose.Schema({
  name: String,
  dose: String,
  freq: String,
  status: String,
});

const HistorySchema = new mongoose.Schema({
  year: String,
  condition: String,
  type: String,
  status: String,
});

const PredictionSchema = new mongoose.Schema({
  endpoint: String,
  features: [Number],
  prediction: String,
  result: String,
  probability: String,
  blockchainHash: String,
  blockchainVerified: { type: Boolean, default: false },
  transactionHash: String,
  createdAt: { type: Date, default: () => new Date() },
});

const ProfileSchema = new mongoose.Schema({
  age: { type: Number, default: 32 },
  gender: { type: String, default: 'Male' },
  contact: { type: String, default: '+91 1234567890' },
  bloodGroup: { type: String, default: 'O+' },
  allergies: { type: [String], default: ['Penicillin', 'Peanuts'] },
  vitals: {
    bp: { type: String, default: '120/80' },
    heartRate: { type: String, default: '72 bpm' },
    spO2: { type: String, default: '98%' },
    temp: { type: String, default: '98.6°F' },
    weight: { type: String, default: '75 kg' },
    height: { type: String, default: '178 cm' },
    bmi: { type: String, default: '23.7' },
  },
  history: { type: [HistorySchema], default: [] },
  medications: { type: [MedicationSchema], default: [] },
  appointments: { type: [AppointmentSchema], default: [] },
});

const SettingsSchema = new mongoose.Schema({
  darkMode: { type: Boolean, default: false },
  emailAlerts: { type: Boolean, default: true },
  smsAlerts: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    displayName: { type: String },
    photoURL: { type: String },
    profile: { type: ProfileSchema, default: () => ({}) },
    settings: { type: SettingsSchema, default: () => ({}) },
    predictions: { type: [PredictionSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;
