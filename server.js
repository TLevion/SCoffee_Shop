const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://levion96_db_user:73Z9Mg520pvfb9LG@coffeeshopcluster.bxgwpwh.mongodb.net/coffee_shop_db?retryWrites=true&w=majority"
  )
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err.message));

// ✅ Schema
const menuSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  inStock: { type: Boolean, default: true },
  image: String,
});

// ✅ Model
const MenuItem = mongoose.model("MenuItem", menuSchema);

// ✅ Routes
app.get("/menu", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch {
    res.status(500).json({ error: "Error fetching menu" });
  }
});

app.get("/menu/random", async (req, res) => {
  try {
    const items = await MenuItem.find({ inStock: true });
    const random = items[Math.floor(Math.random() * items.length)];
    res.json(random);
  } catch {
    res.status(500).json({ error: "Error fetching random item" });
  }
});

// ✅ Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`☕ Coffee shop server running on port ${PORT}`));
