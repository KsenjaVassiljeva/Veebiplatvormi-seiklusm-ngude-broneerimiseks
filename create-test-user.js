const mysql = require('mysql2/promise');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const createTestUser = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'questoria'
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('test123456', salt);

    // Check if user already exists
    const [rows] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      ['testuser@example.com']
    );

    if (rows.length > 0) {
      console.log('Test user already exists');
      console.log('Email: testuser@example.com');
      console.log('Password: test123456');
      await connection.end();
      process.exit(0);
    }

    // Create test user
    await connection.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      ['Test', 'User', 'testuser@example.com', hashedPassword]
    );

    console.log('✓ Test user created successfully!');
    console.log('');
    console.log('Login credentials:');
    console.log('Email: testuser@example.com');
    console.log('Password: test123456');
    console.log('');
    console.log('Use these credentials to login at: http://localhost:5000/login.html');

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Error creating test user:', error);
    process.exit(1);
  }
};

createTestUser();
