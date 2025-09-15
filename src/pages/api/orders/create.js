// src/pages/api/orders/create.js
import { connectToDB } from '../../../lib/mongoose';
import { parseCookies, verifyToken } from '../../../lib/auth';
import Sale from '../../../models/Sale';
import Product from '../../../models/Product';
import User from '../../../models/User';
import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const cookies = parseCookies(req);
  const token = cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });

  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Invalid token' });

  await connectToDB();
  const actor = await User.findById(payload.userId);
  if (!actor || !['staff', 'admin'].includes(actor.role))
    return res.status(403).json({ error: 'Forbidden' });

  const { customerId, items, payWithCredit = false, dueDate } = req.body;
  if (!customerId || !items || !items.length)
    return res.status(400).json({ error: 'Missing data' });

  const customer = await User.findById(customerId);
  if (!customer) return res.status(400).json({ error: 'Customer not found' });

  // compute total and snapshot product data; reduce stock if available
  let total = 0;
  for (const it of items) {
    const p = await Product.findById(it.productId);
    if (!p)
      return res
        .status(400)
        .json({ error: `Product ${it.productId} not found` });
    if (p.stock < it.qty)
      return res
        .status(400)
        .json({ error: `Insufficient stock for ${p.name}` });
  }

  // decrement stocks (simple sequential updates; consider transactions in Atlas)
  for (const it of items) {
    const p = await Product.findById(it.productId);
    await Product.findByIdAndUpdate(p._id, { $inc: { stock: -it.qty } });
    total += p.price * it.qty;
    it.name = p.name;
    it.unitPrice = p.price;
    it.sku = p.sku;
  }

  const saleId = `S-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${nanoid(6).toUpperCase()}`;
  const sale = await Sale.create({
    saleId,
    customer: customer._id,
    items,
    total,
    paymentStatus: payWithCredit ? 'credit' : 'pending',
    dueDate: payWithCredit ? dueDate : undefined,
    createdBy: actor._id,
  });

  // TODO: send email to customer (use resend/sendgrid)
  res.status(201).json({ ok: true, sale });
}
