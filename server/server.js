const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3002;

app.use(cors());

app.use(express.static(path.join(__dirname, 'client', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
