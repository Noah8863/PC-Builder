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

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});