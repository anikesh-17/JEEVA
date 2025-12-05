import axios from "axios";

const BASE = "http://127.0.0.1:5000";

export async function predict(endpoint, features) {
  try {
    const res = await axios.post(`${BASE}${endpoint}`, { features });
    return { ok: true, data: res.data };
  } catch (err) {
    const message =
      err?.response?.data?.error ||
      err?.message ||
      "Unknown error while calling backend";
    return { ok: false, error: message };
  }
}
