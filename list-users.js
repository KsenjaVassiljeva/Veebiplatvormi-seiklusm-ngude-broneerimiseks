const mysql = require('mysql2/promise');
require('dotenv').config();

const listUsers = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'questoria'
    });

    console.log('Fetching users from database...\n');

    const [users] = await connection.query('SELECT id, first_name, last_name, email, created_at FROM users');

    if (users.length === 0) {
      console.log('No users found in database.');
    } else {
      console.log('====== CURRENT USERS IN DATABASE ======\n');
      users.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`  ID: ${user.id}`);
        console.log(`  Name: ${user.first_name} ${user.last_name}`);
        console.log(`  Email: ${user.email}`);
        console.log(`  Created: ${user.created_at}`);
        console.log('');
      });

      console.log('\n====== KNOWN CREDENTIALS ======');
      console.log('Test User:');
      console.log('  Email: testuser@example.com');
      console.log('  Password: test123456');
    }

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Error fetching users:', error);
    process.exit(1);
  }
};

listUsers();
