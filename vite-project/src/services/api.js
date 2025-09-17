import axios from "axios";

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_BASE_URL, // e.g. "https://ingres-chatbot-7hzs.onrender.com"
  ENDPOINTS: {
    SEND_MESSAGE: "/sendMessage", // base path for sendMessage
    GET_INPUT: "/getInput",
  },
};

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 40000,
});

// Interceptors for debugging
api.interceptors.request.use(
  (config) => {
    console.log(
      `[API Request] ${config.method.toUpperCase()} -> ${config.baseURL}${config.url}`,
      config.data || config.params || ""
    );
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    console.log("[API Response]", response.data);
    return response;
  },
  (error) => {
    console.error("[API Error]", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const chatAPI = {
  /**
   * POST /sendMessage/:id
   * @param {string} id - path variable (e.g., message ID or user ID)
   * @param {string} message - text to send
   */
  sendMessage: async (id, message, options = {}) => {
    if (!id) {
      throw new Error("Missing path variable: id");
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      throw new Error("Invalid message: must be a non-empty string");
    }

    try {
      const payload = { text: message };

      const controller = new AbortController();
      if (options.signal) {
        options.signal.addEventListener("abort", () => controller.abort());
      }

      const path = `${API_CONFIG.ENDPOINTS.SEND_MESSAGE}/${encodeURIComponent(id)}`;

      const response = await api.post(path, payload, {
        signal: controller.signal,
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Failed to send message"
      );
    }
  },

  /**
   * GET /getInput
   * @param {object} params - query parameters (optional)
   */
  getInput: async (params = {}, options = {}) => {
    try {
      const controller = new AbortController();
      if (options.signal) {
        options.signal.addEventListener("abort", () => controller.abort());
      }

      const response = await api.get(API_CONFIG.ENDPOINTS.GET_INPUT, {
        params,
        signal: controller.signal,
      });

      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.error ||
          error.message ||
          "Failed to fetch input"
      );
    }
  },
};
