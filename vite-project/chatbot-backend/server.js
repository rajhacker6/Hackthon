// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// API Route to handle chatbot message
app.post('/generate-text', (req, res) => {
  const { prompt } = req.body;


  // Example dummy response
  const reply = `Welcome to the IGRIS can we assist you today?`;

  res.json({
    candidates: [
      {
        content: {
          parts: [reply]
        }
      }
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
