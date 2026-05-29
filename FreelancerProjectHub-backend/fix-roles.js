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

async function fixRoles() {
  try {
    // Fix client account - set role to 'client'
    await User.updateOne(
      { email: 'testclient@example.com' },
      { $set: { role: 'client', otp: undefined, otpExpires: undefined } }
    );
    console.log('✅ Client account role fixed to "client"');
    
    // Verify freelancer account is set to 'freelancer'
    await User.updateOne(
      { email: 'testuser@example.com' },
      { $set: { role: 'freelancer', otp: undefined, otpExpires: undefined } }
    );
    console.log('✅ Freelancer account role confirmed as "freelancer"');
    
    // Show final status
    const client = await User.findOne({ email: 'testclient@example.com' });
    const freelancer = await User.findOne({ email: 'testuser@example.com' });
    
    console.log('\n✅ FINAL STATUS:');
    console.log('────────────────────────────────────────');
    console.log('CLIENT ACCOUNT:');
    console.log('  Email:', client.email);
    console.log('  Password: TestPassword123!');
    console.log('  Role:', client.role);
    console.log('  Verified: ✅');
    console.log('────────────────────────────────────────');
    console.log('FREELANCER ACCOUNT:');
    console.log('  Email:', freelancer.email);
    console.log('  Password: TestPassword123!');
    console.log('  Role:', freelancer.role);
    console.log('  Verified: ✅');
    console.log('────────────────────────────────────────');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixRoles();
