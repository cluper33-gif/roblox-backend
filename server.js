const express = require("express");
const axios = require("axios");

const app = express();

app.get("/api/passes", async (req, res) => {
  const userId = req.query.userId;
  const key = req.query.key;

  if (key !== process.env.SECRET_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  try {
    // 🔥 Step 1: Get user's games
    const gamesRes = await axios.get(
      `https://games.roblox.com/v2/users/${userId}/games?accessFilter=Public&limit=50`
    );

    const games = gamesRes.data.data;

    let allPasses = [];

    // 🔥 Step 2: Loop games → get passes
    for (const game of games) {
      const universeId = game.id;

      const passesRes = await axios.get(
        `https://games.roblox.com/v1/games/${universeId}/game-passes?limit=50`
      );

      const passes = passesRes.data.data;

      for (const pass of passes) {
        if (pass.price !== null) {
          allPasses.push({
            id: pass.id,
            name: pass.name,
            price: pass.price
          });
        }
      }
    }

    res.json({
      success: true,
      passes: allPasses
    });

  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      passes: []
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log("Server running");
});
