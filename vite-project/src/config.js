const CONFIG = {
  API: {
    BASE_URL: import.meta.env.VITE_BASE_URL,
    ENDPOINTS: {
      GENERATE_TEXT: "/sendMessage",
      GET_INPUT: "/getInput",   
    },
  },
  APP: {
    BOT_NAME: "AI Assistant",
  },
};

export default CONFIG;
