# 🚀 JEEVA – Complete Deployment Guide for Beginners

This guide provides a step-by-step walkthrough to deploy **JEEVA** (both the React Frontend and the Flask ML Microservice) to production for free, ensuring everything connects seamlessly without issues.

---

## 📋 Table of Contents
1. [Architecture & Deployment Strategy](#1-architecture--deployment-strategy)
2. [Step 1: Deploying the ML Microservice (Flask) on Render](#step-1-deploying-the-ml-microservice-flask-on-render)
3. [Step 2: Firebase Setup & Authentication Rules](#step-2-firebase-setup--authentication-rules)
4. [Step 3: Deploying the Frontend (React + Vite) on Vercel](#step-3-deploying-the-frontend-react--vite-on-vercel)
5. [Step 4: Authorizing the Production Domain in Firebase](#step-4-authorizing-the-production-domain-in-firebase)
6. [Step 5: Verifying the Live Application](#step-5-verifying-the-live-application)
7. [💻 Local Development Instructions](#-local-development-instructions)

---

## 1. Architecture & Deployment Strategy

JEEVA is currently built as two separate services:
1. **Frontend (`frontend/jeeva-frontend`)**: A React app built with Vite, styled with Tailwind CSS, and powered by Firebase for Authentication. We will deploy this to **Vercel** (highly optimized for Vite apps and free).
2. **ML Microservice (`ml-service/jeeva-ml`)**: A Python Flask server that hosts machine learning classifiers (Diabetes, Heart Disease, Breast Cancer, Parkinson's). We will deploy this to **Render** (supports Python web applications on a free tier).

---

## Step 1: Deploying the ML Microservice (Flask) on Render

[Render](https://render.com/) is a cloud hosting platform that offers a free tier for hosting web services.

### 1. Create a Render Account
- Visit [render.com](https://render.com/) and sign up.
- We recommend signing up using your **GitHub account** to make connecting your repository simple.

### 2. Create a New Web Service
- On the Render Dashboard, click **New +** and select **Web Service**.
- Select **Connect a repository** and choose your `JEEVA` GitHub repository.

### 3. Configure the Web Service Settings
Fill in the deployment settings carefully:
*   **Name**: `jeeva-ml-service` (or any name you prefer)
*   **Region**: Select the region closest to you (e.g., Singapore for Asia, Oregon for US West)
*   **Branch**: `ml-services` (or whichever branch holds your latest code)
*   **Root Directory**: `ml-service/jeeva-ml` *(This tells Render to look only inside the Flask directory)*
*   **Runtime**: `Python 3` (or Python)
*   **Build Command**: `pip install -r requirements.txt`
*   **Start Command**: `gunicorn app:app` *(gunicorn is a production-grade server which we've added to requirements.txt)*

### 4. Select the Free Instance Type
- Scroll down and choose the **Free** tier.
- Click **Deploy Web Service**.

### 5. Obtain your Deployed Backend URL
- Render will start building your service. This may take 2-4 minutes because it installs heavy libraries like `scikit-learn` and `numpy`.
- Once the deployment is complete, Render will display a URL at the top left of the dashboard (e.g., `https://jeeva-ml-service.onrender.com`).
- **Copy this URL.** You will need it for the frontend configuration.

---

## Step 2: Firebase Setup & Authentication Rules

Before deploying the frontend, you must ensure Firebase Authentication is configured.

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Select your `jeeva-bffd5` project.
3. In the left sidebar, click **Build** -> **Authentication**.
4. In the **Sign-in method** tab:
    *   **Email/Password**: Click edit, toggle it to **Enabled**, and save.
    *   **Google**: Click edit, toggle it to **Enabled**, select a support email, and save.
5. Keep the Firebase Console open; you will return here in Step 4.

---

## Step 3: Deploying the Frontend (React + Vite) on Vercel

[Vercel](https://vercel.com/) is the creators of Next.js and provides outstanding support for hosting Vite projects.

### 1. Create a Vercel Account
- Sign up at [vercel.com](https://vercel.com/) using your **GitHub** account.

### 2. Import Your Project
- Click **Add New...** -> **Project**.
- Select your `JEEVA` repository from the list.

### 3. Configure Project Settings
*   **Framework Preset**: `Vite` (Vercel should auto-detect this)
*   **Root Directory**: Click *Edit* and select `frontend/jeeva-frontend`.
*   **Build and Output Settings**: Leave as default.

### 4. Configure Environment Variables (CRITICAL)
Expand the **Environment Variables** section. You must add the variables from your local `.env` file so the React app can access Firebase and your deployed ML service in production:

Add the following keys and paste their corresponding values (refer to your `frontend/jeeva-frontend/.env` file):

| Key | Value | Notes |
|:---|:---|:---|
| `VITE_FIREBASE_API_KEY` | `AIzaSyASHuVn...` | Your Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `jeeva-bffd5.firebaseapp.com` | |
| `VITE_FIREBASE_PROJECT_ID` | `jeeva-bffd5` | |
| `VITE_FIREBASE_STORAGE_BUCKET` | `jeeva-bffd5.firebasestorage.app` | |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `506307331906` | |
| `VITE_FIREBASE_APP_ID` | `1:506307331906:web:608f652c...` | |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-3BQF92CXVN` | |
| `VITE_ML_API_URL` | `https://jeeva-ml-service.onrender.com` | **The Render URL you copied in Step 1!** (Do not include a trailing slash `/`) |

### 5. Deploy
- Click **Deploy**.
- Vercel will install dependencies, build the React app, and deploy it in less than a minute.
- Copy your deployed Vercel URL (e.g., `https://jeeva-frontend.vercel.app`).

---

## Step 4: Authorizing the Production Domain in Firebase

If you attempt to sign in using Google Auth on your deployed Vercel site right now, it will fail and show a security error. Firebase blocks authentication requests from unauthorized domains.

### How to authorize your domain:
1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Authentication** -> **Settings** tab.
3. In the left menu of the settings page, select **Authorized domains**.
4. Click **Add domain**.
5. Paste your Vercel deployment domain (e.g., `jeeva-frontend.vercel.app`).
    *   *Note: Do not include `https://` or any path. Just the raw domain.*
6. Click **Add**.

---

## Step 5: Verifying the Live Application

1. Open your Vercel URL in a browser.
2. Sign in using Email/Password or your Google account.
3. Once logged in, navigate to the **AI Diagnostics** section (e.g., Diabetes or Heart Disease prediction).
4. Fill out the form fields with dummy/test values and click **Run Prediction**.
5. If the prediction returns successfully (e.g. "Non-Diabetic" or "Heart Disease Present"), the setup is fully complete and operational!

> [!NOTE]
> On the free tier of Render, the server spin-down policy applies: if there are no requests for 15 minutes, Render puts the server to "sleep". 
> The first request after a sleep period can take **50–90 seconds** to wake up. This is normal behavior for Render free-tier. Do not worry if your first prediction takes about a minute to process!

---

## 💻 Local Development Instructions

If you need to run the application locally on your computer for editing or testing:

### 🐍 1. Running the ML Microservice (Flask)
Open your terminal (PowerShell or Git Bash):
```bash
# Navigate to the Flask folder
cd ml-service/jeeva-ml

# Create Python virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask app
python app.py
```
Your ML service will run locally at: `http://127.0.0.1:5000`

### ⚛️ 2. Running the Frontend (React Vite)
Open a new terminal window:
```bash
# Navigate to the frontend folder
cd frontend/jeeva-frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```
Your frontend will run locally at: `http://localhost:5173`. It will automatically fall back to using `http://127.0.0.1:5000` for predictions if the `VITE_ML_API_URL` environment variable is not defined.
