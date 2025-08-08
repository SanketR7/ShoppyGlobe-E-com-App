const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Get current user's cart
router.get("/", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [] });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to get cart" });
  }
});

// Add/update item (if exists increment or replace quantity)
router.post("/", protect, async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  if (!productId)
    return res.status(400).json({ message: "productId required" });

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.stock < quantity)
      return res.status(400).json({ message: "Not enough stock" });

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });

    const existing = cart.items.find((i) => i.product.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    cart = await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

// Update quantity
router.put("/:itemId", protect, async (req, res) => {
  const { quantity } = req.body;
  if (quantity == null)
    return res.status(400).json({ message: "Quantity required" });

  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(req.params.itemId);
    if (!item) return res.status(404).json({ message: "Cart item not found" });
    item.quantity = quantity;

    await cart.save();
    cart = await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to update cart item" });
  }
});

// Remove from cart
router.delete("/:itemId", protect, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items.id(req.params.itemId)?.remove();
    await cart.save();
    cart = await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item" });
  }
});

module.exports = router;
