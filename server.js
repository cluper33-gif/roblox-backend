const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Backend running 💪");
});

app.get("/api/passes", (req, res) => {
  console.log("API HIT");

  const userId = req.query.userId;
  const key = req.query.key;

  if (key !== process.env.SECRET_KEY) {
    return res.status(403).json({ success: false, error: "Unauthorized" });
  }

  const playerPasses = {
    "46688234068": [
      { id: 1781500610, name: "Donate 5", price: 5 },
      { id: 1779316655, name: "Donate 10", price: 10 },
      { id: 1780666612, name: "Donate 25", price: 25 }
    ]
  };

  const passes = playerPasses[userId] || [];

  res.json({
    success: true,
    passes: passes
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server started");
});
