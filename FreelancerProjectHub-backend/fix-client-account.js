import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/freelancer-hub')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  otp: String,
  otpExpires: Date,
  profilePicture: String,
  skills: [String],
  bio: String,
  hourlyRate: Number,
  rating: Number,
  completedProjects: Number
});

const User = mongoose.model('User', userSchema);

async function fixClientAccount() {
  try {
    // Find the client account
    const clientUser = await User.findOne({ email: 'testclient@example.com' });
    
    if (clientUser) {
      console.log('Found client user:', clientUser.email);
      
      // Verify the account by clearing OTP
      clientUser.otp = undefined;
      clientUser.otpExpires = undefined;
      await clientUser.save();
      
      console.log('✅ Client account verified successfully!');
      console.log('Email:', clientUser.email);
      console.log('Role:', clientUser.role);
      console.log('Name:', clientUser.name);
    } else {
      console.log('❌ Client user not found. Creating verified client account...');
      
      // Create a new verified client account
      const hashedPassword = await bcrypt.hash('TestPassword123!', 10);
      
      const newClient = new User({
        name: 'Test Client',
        email: 'testclient@example.com',
        password: hashedPassword,
        role: 'client',
        profilePicture: '',
        skills: [],
        bio: 'Test client account',
        hourlyRate: 0,
        rating: 0,
        completedProjects: 0
      });
      
      await newClient.save();
      console.log('✅ New verified client account created!');
      console.log('Email: testclient@example.com');
      console.log('Password: TestPassword123!');
    }
    
    // Also verify the freelancer account
    const freelancerUser = await User.findOne({ email: 'testuser@example.com' });
    if (freelancerUser) {
      freelancerUser.otp = undefined;
      freelancerUser.otpExpires = undefined;
      await freelancerUser.save();
      console.log('✅ Freelancer account verified!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixClientAccount();
