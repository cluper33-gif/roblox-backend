const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend running 💪");
});

app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKS");
});
