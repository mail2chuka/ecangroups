// src/models/Product.js
import mongoose from 'mongoose';

const PriceHistorySchema = new mongoose.Schema(
  {
    price: Number,
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reason: String,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, unique: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  priceHistory: [PriceHistorySchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
