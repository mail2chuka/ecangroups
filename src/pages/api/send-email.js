import { EmailTemplate } from '../../components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { firstName, lastName, email, subject, message } = req.body;

    // Basic server-side validation
    if (!firstName || !lastName || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (firstName.length > 50 || lastName.length > 50) {
      return res
        .status(400)
        .json({ message: 'Names must be 50 characters or less' });
    }

    if (subject.length > 100) {
      return res
        .status(400)
        .json({ message: 'Subject must be 100 characters or less' });
    }

    if (message.length > 1000) {
      return res
        .status(400)
        .json({ message: 'Message must be 1000 characters or less' });
    }

    try {
      const { data, error } = await resend.emails.send({
        from: 'Ecana Group <ecana@ecanagroup.com>', // Update to your verified domain
        to: ['ecana@ecanagroup.com', email], // Your company's email
        subject: subject || 'Contact Form Submission',
        react: EmailTemplate({ firstName, lastName, email, subject, message }),
        replyTo: email, // Allow replies to go to the user's email
      });

      if (error) {
        return res.status(400).json({ message: 'Failed to send email', error });
      }

      return res.status(200).json({ message: 'Email sent successfully', data });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Server error', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
};

export default handler;
