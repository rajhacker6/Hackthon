import { useState } from 'react';
import { chatAPI } from '../services/api';

// Default user ID (can be overridden)
const DEFAULT_USER_ID = 'default-user';

export const useChat = (userId = DEFAULT_USER_ID) => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debug logs
  console.log('[useChat] messages:', messages);
  console.log('[useChat] isLoading:', isLoading);
  console.log('[useChat] error:', error);

  /**
   * Send a message using GET request
   * messageText is sent as a query parameter
   */
  const sendMessage = async (messageText, options = {}) => {
    if (!messageText?.trim()) return; // ignore empty messages

    console.log('[useChat] sendMessage called with:', messageText, options);
    setIsLoading(true);
    setError(null);

    // Add user message
    setMessages((prev) => [
      ...prev,
      { text: messageText, from: 'user', id: `user-${prev.length}` },
    ]);

    try {
      // Send message via GET query
      const response = await chatAPI.getInput({ id: userId, message: messageText }, options);
      console.log('[useChat] sendMessage GET response:', response);

      // Extract bot reply
      const botReply = response|| 'No reply';

      setMessages((prev) => [
        ...prev,
        { text: botReply, from: 'bot', id: `bot-${prev.length}` },
      ]);
    } catch (err) {
      console.error('[useChat] sendMessage error:', err);
      setError(err.message || 'Something went wrong');

      setMessages((prev) => [
        ...prev,
        { text: 'Error: ' + (err.message || 'Something went wrong'), from: 'bot', id: `bot-error-${prev.length}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch input (can also pass params)
  const fetchInput = async (params = {}, options = {}) => {
    console.log('[useChat] fetchInput called with:', params, options);
    setIsLoading(true);
    setError(null);

    try {
      const response = await chatAPI.getInput(params, options);
      console.log('[useChat] fetchInput response:', response);

      const inputText = response?.input || 'No input found';
      setMessages((prev) => [
        ...prev,
        { text: inputText, from: 'bot', id: `bot-input-${prev.length}` },
      ]);
    } catch (err) {
      console.error('[useChat] fetchInput error:', err);
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    console.log('[useChat] clearMessages called');
    setMessages([]);
    setError(null);
  };

  return { messages, isLoading, error, sendMessage, fetchInput, clearMessages };
};
