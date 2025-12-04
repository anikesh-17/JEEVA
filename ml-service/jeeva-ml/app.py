import os
import traceback
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
import pickle

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # allow all origins for development

# Utility for loading models (try joblib then pickle)
def load_model_file(filename):
    path = os.path.join(MODEL_DIR, filename)
    if not os.path.exists(path):
        raise FileNotFoundError(f"Model file not found: {path}")
    # try joblib first
    try:
        return joblib.load(path)
    except Exception:
        # fallback to pickle
        with open(path, "rb") as f:
            return pickle.load(f)

# -------------------------
# Load models at startup
# -------------------------
# Expected files (place in models/):
# diabetes_model.pkl, diabetes_scaler.pkl
# heart_model.pkl
# breast_model.pkl
# parkinsons_model.pkl, parkinsons_scaler.pkl

loaded = {}
load_errors = []

def try_load(name, filename):
    try:
        loaded[name] = load_model_file(filename)
        app.logger.info(f"Loaded {name} from {filename}")
    except Exception as e:
        load_errors.append(f"{name}: {e}")
        app.logger.warning(f"Could not load {name} ({filename}): {e}")

# Load all expected files (if you don't have some, the app still runs but endpoints will return 500)
try_load("diabetes_model", "diabetes_model.pkl")
try_load("diabetes_scaler", "diabetes_scaler.pkl")
try_load("heart_model", "heart_model.pkl")
try_load("breast_model", "breast_model.pkl")
try_load("parkinsons_model", "parkinsons_model.pkl")
try_load("parkinsons_scaler", "parkinsons_scaler.pkl")

if load_errors:
    app.logger.warning("Some models failed to load: " + "; ".join(load_errors))


# Small helper: validate JSON body has `features` list with expected length
def validate_features(req_json, expected_len):
    if not isinstance(req_json, dict):
        return False, "Request body must be a JSON object."
    if "features" not in req_json:
        return False, "Missing 'features' field in JSON body."
    feats = req_json["features"]
    if not isinstance(feats, (list, tuple)):
        return False, "'features' must be a list of numbers."
    if len(feats) != expected_len:
        return False, f"'features' must be length {expected_len}. Received length {len(feats)}."
    # try cast to float
    try:
        arr = np.array([float(x) for x in feats], dtype=float).reshape(1, -1)
    except Exception as e:
        return False, f"Could not convert features to numbers: {e}"
    return True, arr


# -------------------------
# ROUTES
# -------------------------
@app.get("/")
def root():
    status = {"status": "ok", "models_loaded": list(loaded.keys())}
    return jsonify(status), 200


# Diabetes endpoint (expects 8 features)
@app.post("/predict/diabetes")
def predict_diabetes():
    try:
        ok, val = validate_features(request.get_json(force=True), expected_len=8)
        if not ok:
            return jsonify({"error": val}), 400

        X = val  # numpy array shape (1,8)
        if "diabetes_scaler" in loaded:
            X = loaded["diabetes_scaler"].transform(X)
        if "diabetes_model" not in loaded:
            return jsonify({"error": "Diabetes model not loaded on server."}), 500

        pred = loaded["diabetes_model"].predict(X)[0]
        return jsonify(
            {"prediction": int(pred),
             "result": "Diabetic" if int(pred) == 1 else "Non-Diabetic"}
        ), 200

    except Exception as e:
        app.logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500


# Heart disease endpoint (expects 13 features)
@app.post("/predict/heart")
def predict_heart():
    try:
        ok, val = validate_features(request.get_json(force=True), expected_len=13)
        if not ok:
            return jsonify({"error": val}), 400

        X = val
        if "heart_model" not in loaded:
            return jsonify({"error": "Heart model not loaded on server."}), 500

        pred = loaded["heart_model"].predict(X)[0]
        return jsonify(
            {"prediction": int(pred),
             "result": "Heart Disease Present" if int(pred) == 1 else "Healthy Heart"}
        ), 200

    except Exception as e:
        app.logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500


# Breast cancer endpoint (expects 30 features)
@app.post("/predict/breast")
def predict_breast():
    try:
        ok, val = validate_features(request.get_json(force=True), expected_len=30)
        if not ok:
            return jsonify({"error": val}), 400

        X = val
        if "breast_model" not in loaded:
            return jsonify({"error": "Breast cancer model not loaded on server."}), 500

        pred = loaded["breast_model"].predict(X)[0]
        # note: your training used 0->malignant, 1->benign (or vice-versa). adapt message if needed.
        return jsonify(
            {"prediction": int(pred),
             "result": "Benign (Not Cancer)" if int(pred) == 1 else "Malignant Cancer"}
        ), 200

    except Exception as e:
        app.logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500


# Parkinson's endpoint (expects 22 features)
@app.post("/predict/parkinsons")
def predict_parkinsons():
    try:
        ok, val = validate_features(request.get_json(force=True), expected_len=22)
        if not ok:
            return jsonify({"error": val}), 400

        X = val
        if "parkinsons_scaler" in loaded:
            X = loaded["parkinsons_scaler"].transform(X)
        if "parkinsons_model" not in loaded:
            return jsonify({"error": "Parkinsons model not loaded on server."}), 500

        pred = loaded["parkinsons_model"].predict(X)[0]
        return jsonify(
            {"prediction": int(pred),
             "result": "Parkinson Detected" if int(pred) == 1 else "No Parkinson"}
        ), 200

    except Exception as e:
        app.logger.error(traceback.format_exc())
        return jsonify({"error": str(e)}), 500


# Start with `flask run` or python app.py
if __name__ == "__main__":
    # For development only:
    app.run(host="0.0.0.0", port=5000, debug=True)
    