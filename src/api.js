const express = require("express");
const path = require("path");
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
  const data = talim.filter((x) => x.hari === req.params.hari);
  res.json(data);
});

router.get("/talim-mendatang/:hari", (req, res) => {
  const hari = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];
  const idxHari = hari.indexOf(req.params.hari);
  const c1 = (idxHari + 1) % 7;
  const c2 = (idxHari + 2) % 7;
  const data = talim.filter((x) => x.hari === hari[c1] || x.hari === hari[c2]);
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

app.use(express.static(path.join(__dirname, "/public")));

module.exports.handler = serverless(app);
