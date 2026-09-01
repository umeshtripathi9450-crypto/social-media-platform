/**
 * Email utility functions
 * Handles email sending for notifications
 */
const nodemailer = require('nodemailer');

/**
 * Create email transporter
 */
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

/**
 * Send welcome email
 */
const sendWelcomeEmail = async (email, username) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Welcome to Social Media Platform!',
      html: `
        <h1>Welcome, ${username}!</h1>
        <p>Thank you for joining our community.</p>
        <p>Start connecting with others and share your thoughts!</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

/**
 * Send password reset email
 */
const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const transporter = createTransporter();
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
        <p>This link expires in 1 hour.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

/**
 * Send notification email
 */
const sendNotificationEmail = async (email, title, message) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: title,
      html: `
        <h2>${title}</h2>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendNotificationEmail
};
