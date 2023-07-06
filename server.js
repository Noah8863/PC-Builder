const express = require("express");
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get('/parts', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});