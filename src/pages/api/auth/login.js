// src/pages/api/auth/login.js
import { connectToDB } from '../../../lib/mongoose';
import User from '../../../models/User';
import bcrypt from 'bcryptjs';
import { signToken, setTokenCookie } from '../../../lib/auth';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing' });

  await connectToDB();
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken({ userId: user._id, role: user.role });
  setTokenCookie(res, token);
  res.json({
    ok: true,
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
}
