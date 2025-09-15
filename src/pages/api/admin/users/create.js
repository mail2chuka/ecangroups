// src/pages/api/admin/users/create.js
import { connectToDB } from '../../../../lib/mongoose';
import User from '../../../../models/User';
import bcrypt from 'bcryptjs';
import { parseCookies, verifyToken } from '../../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const cookies = parseCookies(req);
  const token = cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'Invalid token' });

  await connectToDB();
  const admin = await User.findById(payload.userId);
  if (!admin || admin.role !== 'admin')
    return res.status(403).json({ error: 'Forbidden' });

  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role)
    return res.status(400).json({ error: 'Missing fields' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email exists' });

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role });
  res.status(201).json({
    ok: true,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}
