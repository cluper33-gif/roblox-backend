const express = require("express");
const axios = require("axios");

const app = express();

// 🔐 your secret key (set this in Render ENV)
const SECRET_KEY = process.env.SECRET_KEY;

// 🧪 test route
app.get("/", (req, res) => {
  res.send("Backend running");
});

// 🎯 MAIN ROUTE
app.get("/api/passes", async (req, res) => {
  const userId = req.query.userId;
  const key = req.query.key;

  // 🔐 security check
  if (key !== SECRET_KEY) {
    return res.json({ success: false, error: "Unauthorized" });
  }

  try {
    // 🔥 Roblox API (get gamepasses)
    const url = `https://games.roblox.com/v1/users/${userId}/game-passes?limit=50`;

    const response = await axios.get(url);

    const passes = response.data.data.map(pass => ({
      id: pass.id,
      name: pass.name,
      price: pass.price
    }));

    res.json({
      success: true,
      passes: passes
    });

  } catch (err) {
    console.error(err.message);

    res.json({
      success: false,
      passes: []
    });
  }
});

// 🚀 start server
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
