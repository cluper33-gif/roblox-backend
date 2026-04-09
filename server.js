const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKS");
});

app.get("/api/passes", (req, res) => {
  const userId = req.query.userId;
  const key = req.query.key;

  if (key !== process.env.SECRET_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  cconst playerPasses = {
  "46688234068": [
    { id: 1791363134, name: "Donate 5", price: 5 },
    { id: 1789882618, name: "Donate 10", price: 10 },
    { id: 1789084533, name: "Donate 25", price: 25 }
  ]
};

  res.json({
    success: true,
    passes: playerPasses[userId] || []
  });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running");
});
