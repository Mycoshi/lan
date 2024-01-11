const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes

app.get('/api/mp4data', (req, res) => {
  const filePath = "C:

  if (!filePath) {
    return res.status(400).send('File path not provided');
  }

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }

    // Stream the file back to the client
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});