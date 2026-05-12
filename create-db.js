const mysql = require('mysql2/promise');
require('dotenv').config();

const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'questoria'}`);
    console.log(`Database '${process.env.DB_NAME || 'questoria'}' created or already exists`);
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Error creating database:', error);
    process.exit(1);
  }
};

createDatabase();
