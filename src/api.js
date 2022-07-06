const express = require("express");
const serverless = require("serverless-http");
const { masjid } = require("./data/masjid");
const { ustadz } = require("./data/ustadz");
const { talim } = require("./data/talim");

const app = express();
const router = express.Router();

router.get("/ustadz", (req, res) => {
  res.json(ustadz);
});

router.get("/talim", (req, res) => {
  res.json(talim);
});

router.get("/masjid", (req, res) => {
  res.json(masjid);
});

router.get("/talim/:hari", (req, res) => {
  const data = masjid.find((x) => x.hari === parseInt(req.params.hari));
  res.json(data);
});

router.get("/masjid/:id", (req, res) => {
  const data = masjid.find((x) => x.id === parseInt(req.params.id));
  res.json(data);
});

router.get("/", (req, res) => {
  res.json({ welcome: "Ta'lim Finder" });
});

app.use("/.netlify/functions/api", router);

module.exports.handler = serverless(app);
