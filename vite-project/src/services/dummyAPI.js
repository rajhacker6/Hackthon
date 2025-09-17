export const chatAPI = {
  sendMessage: async (message) => {
    return new Promise((resolve) => {
      // Simulate network delay
      setTimeout(() => {
        resolve({
          candidates: [
            {
              content: {
                parts: [
                  `This is a dummy reply to: "${message}"`
                ]
              }
            }
          ]
        });
      }, 1000); // 1 second delay
    });
  },
};
