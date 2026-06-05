import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`
});

// Add token to requests
export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// Create a new medical record
export const createMedicalRecord = async (recordData) => {
  try {
    const response = await apiClient.post('/medical-records', recordData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get all medical records for user
export const getUserMedicalRecords = async (userId) => {
  try {
    const response = await apiClient.get(`/medical-records/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get medical record by ID
export const getMedicalRecordById = async (recordId) => {
  try {
    const response = await apiClient.get(`/medical-records/${recordId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update medical record
export const updateMedicalRecord = async (recordId, updateData) => {
  try {
    const response = await apiClient.put(`/medical-records/${recordId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete medical record
export const deleteMedicalRecord = async (recordId) => {
  try {
    const response = await apiClient.delete(`/medical-records/${recordId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Verify blockchain status of a record
export const verifyRecordBlockchain = async (recordId) => {
  try {
    const response = await apiClient.get(`/medical-records/${recordId}/verify`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Make predictions
export const predictDisease = async (endpoint, data, token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/predict/${endpoint}`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default apiClient;
