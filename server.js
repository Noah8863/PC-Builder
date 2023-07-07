const express = require("express");
const app = express();
const path = require('path');

app.use("/parts/", require("./routes/partsRoute"))
app.use("/motherboards/", require("./routes/partsRoute"))
app.use("/CPU/", require("./routes/partsRoute"))
app.use("/GPU/", require("./routes/partsRoute"))
app.use("/RAM/", require("./routes/partsRoute"))
app.use("/Cases/", require("./routes/partsRoute"))
app.use("/Fans/", require("./routes/partsRoute"))
app.use("/PowerSupply/", require("./routes/partsRoute"))

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// app.get('/parts', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

// app.get('/motherboards', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });


const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});