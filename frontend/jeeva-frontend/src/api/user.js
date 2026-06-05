import axios from 'axios';
import { auth } from '../Utils/Config';

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function getAuthHeaders() {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return null;
  }

  const token = await currentUser.getIdToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}

async function safeRequest(fn) {
  try {
    return await fn();
  } catch (err) {
    return {
      ok: false,
      error: err?.response?.data?.error || err?.message || 'Unknown error',
    };
  }
}

export async function fetchUserProfile() {
  const headers = await getAuthHeaders();
  if (!headers) {
    return { ok: false, error: 'User not authenticated' };
  }

  return safeRequest(async () => {
    const res = await axios.get(`${BASE}/api/user/profile`, { headers });
    return { ok: true, data: res.data };
  });
}

export async function fetchUserPredictions() {
  const headers = await getAuthHeaders();
  if (!headers) {
    return { ok: false, error: 'User not authenticated' };
  }

  return safeRequest(async () => {
    const res = await axios.get(`${BASE}/api/user/predictions`, { headers });
    return { ok: true, data: res.data };
  });
}

export async function updateUserProfile(profileData) {
  const headers = await getAuthHeaders();
  if (!headers) {
    return { ok: false, error: 'User not authenticated' };
  }

  return safeRequest(async () => {
    const res = await axios.put(`${BASE}/api/user/profile`, profileData, { headers });
    return { ok: true, data: res.data };
  });
}

export async function recordPrediction(payload) {
  const headers = await getAuthHeaders();
  if (!headers) {
    return { ok: false, error: 'User not authenticated' };
  }

  return safeRequest(async () => {
    const res = await axios.post(`${BASE}/api/user/predictions`, payload, { headers });
    return { ok: true, data: res.data };
  });
}

export async function fetchUserSettings() {
  const headers = await getAuthHeaders();
  if (!headers) {
    return { ok: false, error: 'User not authenticated' };
  }

  return safeRequest(async () => {
    const res = await axios.get(`${BASE}/api/user/settings`, { headers });
    return { ok: true, data: res.data };
  });
}

export async function updateUserSettings(settingsData) {
  const headers = await getAuthHeaders();
  if (!headers) {
    return { ok: false, error: 'User not authenticated' };
  }

  return safeRequest(async () => {
    const res = await axios.put(`${BASE}/api/user/settings`, settingsData, { headers });
    return { ok: true, data: res.data };
  });
}
