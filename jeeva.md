# 🏥 JEEVA – Digital Health Record Management System

<p align="center">
  <img src="https://img.shields.io/badge/System-Decentralized%20%7C%20AI--Powered-teal?style=for-the-badge&logo=blockchain" alt="System Type">
  <img src="https://img.shields.io/badge/Tech-React%20%7C%20Flask%20%7C%20Solidity-blue?style=for-the-badge&logo=react" alt="Tech Stack">
  <img src="https://img.shields.io/badge/Security-AES%20%7C%20SHA--256%20%7C%20Firebase-orange?style=for-the-badge&logo=firebase" alt="Security Info">
</p>

---

## 🌟 1. Executive Summary & Overview

**JEEVA (Joint Enterprise for Excellence in Vitality Assurance)** is a state-of-the-art Digital Health Record (DHR) management platform. It fuses **Machine Learning (ML)** diagnostic analytics with **Blockchain** data integrity layers to create a secure, private, and intelligent ecosystem for patients, doctors, and healthcare institutions.

At its core, JEEVA resolves critical issues in modern healthcare IT:
*   **Scattered Medical Records:** Unifies fragmented records under a single profile with user-controlled tabs (Overview, History, Medications, Reports, and Bills).
*   **Data Tampering & Integrity:** Employs decentralized ledger technologies to store cryptographic hashes of health records, making malicious edits instantly detectable.
*   **Consent-Driven Access:** Gives patients complete ownership over who accesses their records (doctors, clinics, or research entities).
*   **Pre-emptive AI Diagnostics:** Offers immediate screening tools for high-impact chronic conditions (Diabetes, Heart Disease, Breast Cancer, and Parkinson’s) using machine learning.

---

## 🎨 2. Architectural Design

JEEVA adopts a **Decoupled Microservice Architecture** to maintain clean boundaries between user interfaces, cryptographic validation layers, and heavy ML calculations.

### High-Level Architecture Block Diagram

```mermaid
graph TD
    subgraph Client Layer [Frontend Client]
        A[🧑 Patient / Doctor] -->|Interacts with UI| B["🌐 React Web App<br/>(Vite + TailwindCSS + Recharts)"]
    end

    subgraph Authentication & Gateway [Identity Access]
        B -->|OAuth / Session Auth| C["🔥 Firebase Authentication<br/>(Google & Email/Password Sign-In)"]
    end

    subgraph Core Services [Business Logic Layer]
        B -->|API Requests / JSON| D["⚙️ Express.js Node API Gateway<br/>(Routing & Controllers)"]
        D <-->|Fetch/Save Profile & Records| E[("🗄️ MongoDB Database<br/>(User Profiles, Vitals, History)")]
    end

    subgraph Secure Ledger [Integrity Layer]
        D -->|Record Notarization & Validation| F["🔗 Web3 Provider / Smart Contract<br/>(Solidity Registry / Ethereum/Hyperledger)"]
    end

    subgraph Artificial Intelligence [Machine Learning Microservice]
        B -->|HTTP POST Features| G["🧠 Flask ML Microservice<br/>(Numpy + Scikit-Learn Models)"]
        G <-->|Load Scalers & Classifiers| H[("📁 Models Store<br/>(diabetes_model.pkl, heart_model.pkl, etc.)")]
    end

    %% Styling
    style B fill:#e0f2f1,stroke:#00796b,stroke-width:2px
    style C fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style D fill:#ede7f6,stroke:#5e35b1,stroke-width:2px
    style E fill:#f3e5f5,stroke:#8e24aa,stroke-width:2px
    style F fill:#eceff1,stroke:#455a64,stroke-width:2px
    style G fill:#efebe9,stroke:#5d4037,stroke-width:2px
```

---

## 📊 3. Data Flow Diagrams (DFD)

### Level 0 DFD: Context Diagram
The Context Diagram represents the system boundaries, showing external entities and their major interactions with the JEEVA Platform.

```mermaid
graph LR
    Patient([🧑 Patient])
    Doctor([🏥 Doctor / Clinician])
    JEEVA[("💻 JEEVA Core Platform")]
    Firebase[("🔥 Firebase Auth Service")]
    Blockchain[("🔗 Blockchain Ledger")]
    ML[("🧠 Flask ML Service")]

    %% Flows
    Patient -->|1. Email/Google credentials| Firebase
    Firebase -->|2. Authenticated Session Token| Patient
    Patient -->|3. Record files & Vitals data| JEEVA
    JEEVA -->|4. Interactive health reports & Trends| Patient
    
    Doctor -->|5. Access request & Audit permissions| JEEVA
    JEEVA -->|6. Approved medical records / Patient history| Doctor
    
    JEEVA -->|7. Cryptographic record hash| Blockchain
    Blockchain -->|8. Blockchain verification receipt| JEEVA
    
    JEEVA -->|9. Clinical features list| ML
    ML -->|10. Diagnostic predictions & Risk indicators| JEEVA
```

---

### Level 1 DFD: Core Processes
Level 1 outlines how data flows across the system's subsystems, processes, databases, and key external services.

```mermaid
flowchart TD
    %% External Entities
    Patient([🧑 Patient])
    Doctor([🏥 Doctor])

    %% Processes
    P1["1.0 Auth & Identity Control"]
    P2["2.0 Profile & Vitals Aggregation"]
    P3["3.0 Health Risk Predictor"]
    P4["4.0 Medical Record Auditing"]
    P5["5.0 Consent & Access Policy Engine"]
    P6["6.0 Analytics Dashboard Generator"]

    %% Data Stores
    DS1[("🗄️ DS-1: MongoDB Profiles & Records")]
    DS2[("🔥 DS-2: Firebase Auth Index")]
    DS3[("🔗 DS-3: Blockchain Ledger (Hashes)")]
    DS4[("📁 DS-4: Pre-Trained AI Models")]

    %% Authentication Flow
    Patient -->|Auth Request| P1
    P1 <-->|Verify ID Tokens| DS2
    P1 -->|Establish Session| Patient

    %% Vitals Management
    Patient -->|Log Vitals BP, Temp, Weight, HR| P2
    P2 -->|Save Vitals Data| DS1
    DS1 -->|Retrieve Vitals| P2
    P2 -->|Send Vital Metrics| P6

    %% Clinical Risk Prediction
    Patient -->|Enter Feature Parameters| P3
    P3 <-->|Retrieve Scalers & Models| DS4
    P3 -->|Evaluate Model Classifiers| DS4
    P3 -->|Deliver Risk Predictions| Patient

    %% Record Upload & Hash Verification
    Patient -->|Upload PDF or Image Document| P4
    P4 -->|Write Metadata & URL| DS1
    P4 -->|Publish Doc SHA-256 Hash| DS3
    DS3 -->|Verify Integrity Check| P4
    P4 -->|Document Authenticity Verified| Patient

    %% Consent Management
    Doctor -->|Request Record Access| P5
    P5 <-->|Validate Access Policy Rules| DS1
    P5 -->|Generate Temporary Access Token| Doctor
    Doctor -->|Read Decrypted Records| P4

    %% Visual Analytics
    DS1 -->|Aggregate Health Records| P6
    P6 -->|Recharts Interactive Graphs| Patient

    %% Styling
    style P1 fill:#e8f8f5,stroke:#117a65,stroke-width:1px
    style P2 fill:#e8f8f5,stroke:#117a65,stroke-width:1px
    style P3 fill:#e8f8f5,stroke:#117a65,stroke-width:1px
    style P4 fill:#e8f8f5,stroke:#117a65,stroke-width:1px
    style P5 fill:#e8f8f5,stroke:#117a65,stroke-width:1px
    style P6 fill:#e8f8f5,stroke:#117a65,stroke-width:1px
```

---

### Level 2 DFD: AI Health Risk Prediction Pipeline
Detailed process decomposition representing feature processing, feature scaling, model scoring, and result packaging.

```mermaid
flowchart TD
    Patient([🧑 Patient])
    P31["3.1 Select Classifier Page<br/>(Diabetes, Heart, Breast, Parkinson)"]
    P32["3.2 Perform Input Sanitization<br/>(Numeric conversion & validation)"]
    P33["3.3 Apply Feature Scaling<br/>(z-score Normalization)"]
    P34["3.4 Execute Binary Classifier<br/>(Predict class & confidence score)"]
    P35["3.5 Parse Prediction Response<br/>(Generate report & suggestions)"]

    DS_Scale[("📁 Scalers Store (.pkl)")]
    DS_Models[("🧠 Models Store (.pkl)")]

    %% Flows
    Patient -->|Selects Predictor| P31
    P31 -->|Form Input Fields| Patient
    Patient -->|Submits Feature Inputs| P32
    
    P32 -->|Raw Feature Vector| P33
    P33 <-->|Load Scaler Instance| DS_Scale
    P33 -->|Normalized Vectors| P34
    P34 <-->|Evaluate Trained Weights| DS_Models
    P34 -->|Class Prediction 0 or 1| P35
    P35 -->|Display Result UI Panel| Patient

    style P31 fill:#f9ebea,stroke:#c0392b,stroke-width:1px
    style P32 fill:#f9ebea,stroke:#c0392b,stroke-width:1px
    style P33 fill:#f9ebea,stroke:#c0392b,stroke-width:1px
    style P34 fill:#f9ebea,stroke:#c0392b,stroke-width:1px
    style P35 fill:#f9ebea,stroke:#c0392b,stroke-width:1px
```

---

## 🔄 4. System Flowcharts

### 4.1 Authentication & Authorization Flow
Shows the logic for user login, handling Firebase persistence, and routing.

```mermaid
flowchart TD
    Start([User opens Jeeva App]) --> CheckAuth{Is session stored in Local Auth?}
    CheckAuth -->|Yes| SetUser[Load profile & Redirect /home]
    CheckAuth -->|No| ShowLogin[Show Login Screen]
    
    ShowLogin --> ClickAuth{Select Auth Type}
    ClickAuth -->|Google Provider| GoG[Popup Google Sign-in]
    ClickAuth -->|Email / Password| EmPass[Enter credentials & Submit]
    
    GoG --> AuthAPI[Call Firebase auth.signInWithPopup]
    EmPass --> AuthAPI2[Call Firebase auth.signInWithEmailAndPassword]
    
    AuthAPI & AuthAPI2 --> SuccessCheck{Success?}
    SuccessCheck -->|No| ShowErr[Display validation error banner] --> ShowLogin
    SuccessCheck -->|Yes| SetPersistent[Configure browserSessionPersistence]
    SetPersistent --> NavigateHome[Route to Dashboard /home] --> End([Logged in])
```

---

### 4.2 AI Health Prediction Flow
Details the operations executed when running a prediction model in real time.

```mermaid
flowchart TD
    Start([Click 'Run Prediction']) --> ValidateInputs{Are all form fields filled?}
    ValidateInputs -->|No| ShowWarning[Show field error highlight]
    ValidateInputs -->|Yes| ConvertNumbers[Attempt float conversion]
    
    ConvertNumbers --> CheckNumberValid{Is array numeric?}
    CheckNumberValid -->|No| ShowInvalidWarning[Display numeric format warning]
    CheckNumberValid -->|Yes| SendPost[Send HTTP POST with features payload]
    
    SendPost --> FlaskReceive[Flask route catches request]
    FlaskReceive --> ValidateLen{Does features list length match model inputs?}
    ValidateLen -->|No| Return400[Return 400 Bad Request]
    ValidateLen -->|Yes| LoadScaler{Is scaler available?}
    
    LoadScaler -->|Yes| ApplyScale[Transform inputs with loaded scaler] --> EvalModel
    LoadScaler -->|No| EvalModel[Classify features using Scikit-Learn predictor]
    
    EvalModel --> BuildRes[Format prediction and label response]
    BuildRes --> Return200[Return 200 JSON Response]
    
    Return200 --> UpdateUI[Display risk level: Healthy vs At-Risk]
    Return400 & ShowWarning & ShowInvalidWarning & ShowWarning --> End([Workflow complete])
```

---

### 4.3 Blockchain Record Auditing Flow
Tracks the process of writing records to database, generating and locking record hashes on the Blockchain, and verifying record integrity.

```mermaid
flowchart TD
    Start([User uploads medical record]) --> SaveDB[Store file to backend storage & record Metadata to MongoDB]
    SaveDB --> GenerateHash[Calculate SHA-256 hash of the record metadata & contents]
    GenerateHash --> Web3Trigger[Express Backend calls Blockchain smart contract via Web3.js]
    Web3Trigger --> SignTx[Sign Solidity transaction with user keys]
    SignTx --> WriteContract[Write record ID and Hash to Blockchain Ledger]
    WriteContract --> LockHash([Block Mined: Hash Locked])
    
    %% Audit Step
    LockHash --> AuditReq[User / Doctor queries record integrity]
    AuditReq --> FetchLocal[Fetch document metadata & contents from database]
    FetchLocal --> RecalculateHash[Recalculate SHA-256 hash of the retrieved document]
    RecalculateHash --> QueryContract[Call smart contract to retrieve original Hash by Record ID]
    QueryContract --> CompareHashes{Does database hash == blockchain hash?}
    
    CompareHashes -->|Yes| ValidStatus[Status: Genuine & Untampered]
    CompareHashes -->|No| TamperStatus[Status Alert: Security Breach / File Tampering Detected]
    
    ValidStatus & TamperStatus --> End([Workflow complete])
```

---

## 🧠 5. Machine Learning Predictors

JEEVA offers four pre-trained diagnostic predictors. When users submit inputs, they undergo preprocessing in the Python Flask service.

### 5.1 Models Specification

| Model Name | Target Prediction | Features Count | Core Features List | Backend Endpoint |
| :--- | :--- | :---: | :--- | :--- |
| **Diabetes Classifier** | Diabetic vs Non-Diabetic | `8` | Pregnancies, Glucose, Blood Pressure, Skin Thickness, Insulin, BMI, Diabetes Pedigree Function, Age | `/predict/diabetes` |
| **Heart Disease Classifier** | Heart Disease vs Healthy Heart | `13` | Age, Sex, CP (Chest Pain Type), Resting BP, Serum Cholesterol, Fasting Blood Sugar, Resting ECG, Max Heart Rate, Exercise Angina, Oldpeak, ST Segment Slope, Number of Major Vessels (ca), Thalassemia (thal) | `/predict/heart` |
| **Breast Cancer Classifier** | Benign (Not Cancer) vs Malignant | `30` | Mean radius, mean texture, mean perimeter, mean area, mean smoothness, mean compactness, mean concavity, mean concave points, mean symmetry, mean fractal dimension (along with corresponding "error" and "worst" values for each) | `/predict/breast` |
| **Parkinson’s Classifier** | Parkinson's Disease Detected vs Healthy | `22` | Vocal patterns & voice metrics: Fundamental frequencies (Fo, Fhi, Flo), Jitter (%, Abs, RAP, PPQ, DDP), Shimmer (dB, APQ3, APQ5, APQ, DDA), Noise-to-Harmonic ratio (NHR), HNR, RPDE, DFA, Spread1, Spread2, D2, PPE | `/predict/parkinsons` |

### 5.2 Python Flask Pipeline Implementation

```python
# app.py code snippet showing preprocessing & scaling logic
@app.post("/predict/diabetes")
def predict_diabetes():
    try:
        # 1. Input Validation
        ok, val = validate_features(request.get_json(force=True), expected_len=8)
        if not ok:
            return jsonify({"error": val}), 400

        X = val  # numpy array shape (1,8)
        
        # 2. Scaling transformation
        if "diabetes_scaler" in loaded:
            X = loaded["diabetes_scaler"].transform(X)
            
        if "diabetes_model" not in loaded:
            return jsonify({"error": "Diabetes model not loaded on server."}), 500

        # 3. Model Scoring
        pred = loaded["diabetes_model"].predict(X)[0]
        return jsonify({
             "prediction": int(pred),
             "result": "Diabetic" if int(pred) == 1 else "Non-Diabetic"
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
```

---

## 🗄️ 6. Database Schema Design (MongoDB)

Here are the conceptual schemas used in JEEVA's database.

### 6.1 Users Collection
Stores personal information, authentication reference IDs, and role permissions.
```json
{
  "_id": "ObjectId('65f2a1b9e077a94b5c8c221a')",
  "uid": "FIREBASE_UID_102837482",
  "displayName": "Anikesh Sharma",
  "email": "anikesh@jeeva.ai",
  "role": "Patient",
  "createdAt": "2026-04-14T11:40:28.000Z"
}
```

### 6.2 Patient Vitals Collection
Maintains real-time vital readings logged by patients or synchronized devices.
```json
{
  "_id": "ObjectId('65f2a1b9e077a94b5c8c221b')",
  "patientId": "PAT-2024-8592",
  "vitals": {
    "bloodPressure": "120/80",
    "heartRate": 72,
    "spO2": 98,
    "temperature": 98.6,
    "weightKg": 75,
    "heightCm": 178,
    "bmi": 23.7
  },
  "allergies": ["Penicillin", "Peanuts"],
  "updatedAt": "2026-06-01T10:43:00.000Z"
}
```

### 6.3 Medical Records Audit Collection
Stores metadata for uploaded documents along with reference hashes for integrity verification on the blockchain.
```json
{
  "_id": "ObjectId('65f2a1b9e077a94b5c8c221c')",
  "patientId": "PAT-2024-8592",
  "recordName": "Cardiology Report.pdf",
  "fileUrl": "https://storage.jeeva.ai/records/cardio-8592.pdf",
  "documentHash": "3f7c9e0a2d5f8b6e7a4c2d8a0c5f6e8b2a5c4d1e8f9a7b6c5d4e3f2a1b0c9d8e",
  "blockchainTxId": "0x5c8e4a9f2b8c5d6e2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e",
  "uploadedBy": "Dr. Sharma",
  "timestamp": "2026-05-30T14:15:00.000Z"
}
```

---

## 🛠️ 7. Installation & Setup Guide

### 7.1 ML Microservice Configuration
1. Navigate to the ML folder:
   ```bash
   cd ml-service/jeeva-ml
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install model execution dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Verify pre-trained models are located inside the `models/` directory:
   *   `diabetes_model.pkl` & `diabetes_scaler.pkl`
   *   `heart_model.pkl`
   *   `breast_cancer_model.pkl`
   *   `parkinsons_model.pkl` & `parkinsons_scaler.pkl`
5. Boot up the server:
   ```bash
   python app.py
   ```
   *The ML API runs locally on `http://127.0.0.1:5000`.*

### 7.2 Frontend Web App Setup
1. Navigate to the frontend workspace:
   ```bash
   cd frontend/jeeva-frontend
   ```
2. Populate the `.env` file with your Firebase credentials:
   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```
3. Install frontend modules:
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The application will boot up at `http://localhost:5173`.*

---

## 🚀 8. Future Milestones & Features

1.  **Decentralized Access Consents:** Enable patient smart contracts where access rights are granted or revoked directly by signed Web3 transactions.
2.  **Emergency Override Key (Break-the-Glass):** A secure emergency protocol allowing certified hospital entities to retrieve critical vitals without consent delays, logged to the blockchain for audit trails.
3.  **Real-Time Diagnostics Feed:** Connect wearable IoT devices (smartwatches/glucose monitors) directly to MongoDB via WebSockets to feed data to real-time risk trackers.

---
<p align="center">
  ❤️ Engineered for Health Security by <b>Team Arceus 🍀</b>
</p>
