// src/pages/dashboard/index.js
import React from 'react';
import { parse } from 'cookie';
import { verifyToken } from '../../lib/auth';
import { connectToDB } from '../../lib/mongoose';
import User from '../../models/User';
import Sale from '../../models/Sale';

export default function DashboardPage({ user, sales }) {
  if (!user) return <div>Please log in</div>;

  return (
    <div className="p-6 container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.name}</h1>
      <h2 className="text-xl font-semibold mb-2">Your purchases</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>Products</th>
            <th>Total</th>
            <th>Amount Paid</th>
            <th>Balance</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((s) => (
            <tr key={s._id}>
              <td>{s.saleId}</td>
              <td>{s.items.map((i) => i.name).join(', ')}</td>
              <td>{s.total.toFixed(2)}</td>
              <td>{(s.amountPaid || 0).toFixed(2)}</td>
              <td>{(s.total - (s.amountPaid || 0) || 0).toFixed(2)}</td>
              <td>
                <button
                  onClick={() =>
                    window.open(`/api/sales/receipt?saleId=${s.saleId}`)
                  }
                >
                  Print
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;
  if (!token) return { redirect: { destination: '/login', permanent: false } };
  const payload = verifyToken(token);
  if (!payload)
    return { redirect: { destination: '/login', permanent: false } };

  await connectToDB();
  const user = await User.findById(payload.userId)
    .select('-passwordHash')
    .lean();
  if (!user) return { redirect: { destination: '/login', permanent: false } };

  const sales = await Sale.find({ customer: user._id })
    .sort({ createdAt: -1 })
    .lean();
  return { props: { user, sales } };
}
