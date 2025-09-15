// src/lib/auth.js
import jwt from 'jsonwebtoken';
import { serialize, parse } from 'cookie';

const TOKEN_NAME = 'token';
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

if (!JWT_SECRET) throw new Error('JWT_SECRET not set');

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function setTokenCookie(res, token) {
  const cookie = serialize(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  res.setHeader('Set-Cookie', cookie);
}

export function removeTokenCookie(res) {
  const cookie = serialize(TOKEN_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  res.setHeader('Set-Cookie', cookie);
}

export function parseCookies(req) {
  return parse(req ? req.headers.cookie || '' : document.cookie || '');
}
