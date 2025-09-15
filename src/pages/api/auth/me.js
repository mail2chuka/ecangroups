// src/pages/api/auth/me.js
import { parseCookies, verifyToken } from '../../../lib/auth';
import { connectToDB } from '../../../lib/mongoose';
import User from '../../../models/User';

export default async function handler(req, res) {
  const cookies = parseCookies(req);
  const token = cookies.token;
  if (!token) return res.json({ user: null });

  const payload = verifyToken(token);
  if (!payload) return res.json({ user: null });

  await connectToDB();
  const user = await User.findById(payload.userId)
    .select('-passwordHash')
    .lean();
  res.json({ user });
}
