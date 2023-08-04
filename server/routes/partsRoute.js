const express = require("express");
router = express.Router();

partsRoute = require("../controllers/partsControllers");

router.get("/", partsRoute.partsControllers);

router.get("/parts/", (req, res) => {
  const allParts = data;
  res.json(allParts);
});

router.get("/motherboards", (req, res) => {
  const motherboards = data.motherboards;
  res.json(motherboards);
});

router.get("/CPU", (req, res) => {
  const cpus = data.cpus;
  res.json(cpus);
});

router.get("/GPU", (req, res) => {
  const gpu = data.gpus;
  res.json(gpu);
});

router.get("/RAM", (req, res) => {
  const ram = data.ram;
  res.json(ram);
});

router.get("/Cases", (req, res) => {
  const cases = data.cases;
  res.json(cases);
});

router.get("/Fans", (req, res) => {
  const fans = data.fans;
  res.json(fans);
});

router.get("/PowerSupply", (req, res) => {
  const ptSupply = data.powerSupply;
  res.json(ptSupply);
});

router.get("/Monitor", (req, res) => {
  const monitor = data.monitor;
  res.json(monitor);
});

module.exports = router;
