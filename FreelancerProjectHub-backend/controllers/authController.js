import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utils/sendEmail.js';

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();

    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000, 
    });

    await user.save();

    // Send email in background (non-blocking)
    // If email fails, signup still succeeds
    sendEmail({
      to: user.email,
      subject: 'Verify Your Email Address - Freelancer Hub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to Freelancer Hub!</h2>
          <p>Your verification OTP is: <strong style="font-size: 24px; color: #4f46e5;">${otp}</strong></p>
          <p>This code is valid for 10 minutes.</p>
          <p style="color: #666; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    }).catch((emailErr) => {
      console.warn(`⚠️ Email failed to send for ${email}`);
      console.warn(`   Error: ${emailErr.message}`);
      console.log(`📝 Test OTP for ${email}: ${otp}`);
    });

    return res.status(201).json({
      msg: 'User registered successfully. Please verify your email with the OTP.',
      otp: process.env.NODE_ENV === 'development' ? otp : undefined, // Return OTP in dev mode
      email: email,
    });
  } catch (err) {
    console.error('Signup error:', err.message);
    return res.status(500).json({ msg: 'Server error. Please try again.' });
  }
};

export const verifyOtpAndLogin = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid OTP or OTP has expired.' });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // --- FIX: Added role, name, and email to JWT payload ---
    const payload = { 
      user: { 
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email
      } 
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.json({
      token,
      user: {
        _id: user._id,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error. Please try again.' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (user.otp) {
      return res.status(400).json({
        msg: 'Please verify your email with OTP before logging in.',
      });
    }
    
    // --- FIX: Added role, name, and email to JWT payload ---
    const payload = { 
      user: { 
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email
      } 
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    return res.json({
      token,
      user: {
        _id: user._id,
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error. Please try again.' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail({
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>Your OTP for password reset is: <strong>${otp}</strong>. It is valid for 10 minutes.</p>`,
    });

    return res.json({ msg: 'OTP sent to your email.' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid OTP or OTP has expired.' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.json({ msg: 'Password has been reset successfully.' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
};