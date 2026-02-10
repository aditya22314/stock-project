
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

async function main() {
  console.log('Testing email credentials...');
  console.log(`Email: ${process.env.NODEMAILER_EMAIL}`);
  console.log(`Password Length: ${process.env.NODEMAILER_PASSWORD ? process.env.NODEMAILER_PASSWORD.length : 0}`);

  try {
    await transporter.verify();
    console.log('✅ Credentials verified! Server is ready to take our messages');
  } catch (error) {
    console.error('❌ Error verifying credentials:', error);
  }
}

main();
