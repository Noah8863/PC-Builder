const express = require("express");
const app = express();
const path = require('path');
// const { admin, db } = require("./config/firebase");

app.use("/parts/", require("./routes/partsRoute"))
app.use("/motherboards/", require("./routes/partsRoute"))
app.use("/CPU/", require("./routes/partsRoute"))
app.use("/GPU/", require("./routes/partsRoute"))
app.use("/RAM/", require("./routes/partsRoute"))
app.use("/Cases/", require("./routes/partsRoute"))
app.use("/Fans/", require("./routes/partsRoute"))
app.use("/PowerSupply/", require("./routes/partsRoute"))
app.use("/Monitor/", require("./routes/partsRoute"))

app.post("/api/builds", async (req, res) => {
  try {
    const buildData = req.body; // Assuming the build data is sent in the request body

    // Add the build data to Firebase Firestore
    const buildRef = await db.collection("builds").add(buildData);

    res.status(201).json({ message: "Build created successfully", id: buildRef.id });
  } catch (error) {
    console.error("Error creating build:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use(express.static(path.join(__dirname, 'client', 'build')));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});