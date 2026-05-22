const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/community-events');
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Atlas connection error: ${error.message}`);
    console.log('Falling back to local in-memory MongoDB (mongodb-memory-server) to allow the app to start...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      const connection = await mongoose.connect(mongoUri);
      console.log(`Local In-Memory MongoDB connected: ${connection.connection.host}`);

      // Auto-seed a test user for local convenience so the user has an active login
      try {
        const User = require('../models/User');
        const bcrypt = require('bcryptjs');
        const defaultEmail = 'test@example.com';
        const defaultPassword = 'Password123!';
        
        const existing = await User.findOne({ email: defaultEmail });
        if (!existing) {
          const hashedPassword = await bcrypt.hash(defaultPassword, 10);
          await User.create({
            name: 'Test User',
            email: defaultEmail,
            password: hashedPassword,
            role: 'core',
          });
          console.log(`[SEED] Pre-seeded local login account:`);
          console.log(`  - Email: ${defaultEmail}`);
          console.log(`  - Password: ${defaultPassword}`);
        }
      } catch (seedErr) {
        console.error('Failed to pre-seed test user:', seedErr.message);
      }

    } catch (memError) {
      console.error(`Failed to start in-memory MongoDB: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
