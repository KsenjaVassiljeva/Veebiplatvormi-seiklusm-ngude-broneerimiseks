const mysql = require('mysql2/promise');
require('dotenv').config();

const recreateDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    });

    const dbName = process.env.DB_NAME || 'questoria';

    // Drop existing database
    try {
      await connection.query(`DROP DATABASE ${dbName}`);
      console.log(`Database '${dbName}' dropped`);
    } catch (error) {
      console.log(`Database '${dbName}' doesn't exist yet`);
    }

    // Create new database
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
    console.log(`Database '${dbName}' created`);
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Error recreating database:', error);
    process.exit(1);
  }
};

recreateDatabase();
