import React from 'react';

export function EmailTemplate({
  firstName,
  lastName,
  email,
  subject,
  message,
}) {
  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        color: '#333',
      }}
    >
      <h1 style={{ color: '#d1434b' }}>New Contact Form Submission</h1>
      <p>
        <strong>From:</strong> {firstName} {lastName}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Subject:</strong> {subject}
      </p>
      <p>
        <strong>Message:</strong>
      </p>
      <p style={{ whiteSpace: 'pre-wrap' }}>{message}</p>
      <hr style={{ borderTop: '1px solid #eee', margin: '20px 0' }} />
      <p style={{ fontSize: '0.9em', color: '#555' }}>
        This email was sent from the Ecana Group contact form.
      </p>
    </div>
  );
}
