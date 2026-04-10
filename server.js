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
    let allPasses = [];

    // 🔥 Get passes directly from catalog (THIS WORKS)
    const response = await axios.get(
      `https://catalog.roblox.com/v1/search/items/details`,
      {
        params: {
          Category: 1,
          CreatorTargetId: userId,
          CreatorType: "User",
          Limit: 30
        }
      }
    );

    const items = response.data.data;

    for (const item of items) {
      if (item.itemType === "Game Pass" && item.price !== null) {
        allPasses.push({
          id: item.id,
          name: item.name,
          price: item.price
        });
      }
    }

    res.json({
      success: true,
      passes: allPasses
    });

  } catch (err) {
    console.error("ERROR:", err.message);

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
