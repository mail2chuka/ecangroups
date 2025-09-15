// src/models/Sale.js
import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    sku: String,
    qty: Number,
    unitPrice: Number,
  },
  { _id: false }
);

const PaymentSchema = new mongoose.Schema(
  {
    amount: Number,
    method: String,
    date: { type: Date, default: Date.now },
    note: String,
  },
  { _id: false }
);

const SaleSchema = new mongoose.Schema({
  saleId: { type: String, required: true, unique: true },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [ItemSchema],
  total: { type: Number, required: true },
  payments: [PaymentSchema],
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'credit', 'partially_paid', 'refunded'],
    default: 'pending',
  },
  dueDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  metadata: Object,
  createdAt: { type: Date, default: Date.now },
});

SaleSchema.virtual('amountPaid').get(function () {
  return (this.payments || []).reduce((s, p) => s + (p.amount || 0), 0);
});
SaleSchema.virtual('balance').get(function () {
  return (
    (this.total || 0) -
    (this.payments || []).reduce((s, p) => s + (p.amount || 0), 0)
  );
});

SaleSchema.set('toObject', { virtuals: true });
SaleSchema.set('toJSON', { virtuals: true });

export default mongoose.models.Sale || mongoose.model('Sale', SaleSchema);
