const mysql = require('mysql2/promise');
require('dotenv').config();

const checkDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'questoria'
    });

    console.log('Checking database structure...\n');

    // List all tables
    const [tables] = await connection.query("SHOW TABLES");
    console.log('Tables in database:');
    tables.forEach(table => {
      console.log(`  - ${Object.values(table)[0]}`);
    });

    // Check time slots
    console.log('\n--- TIME SLOTS TABLE ---');
    try {
      const [timeSlots] = await connection.query('SELECT * FROM time_slots LIMIT 5');
      console.log(`✓ time_slots table exists with ${timeSlots.length} rows`);
    } catch (e) {
      console.log('✗ time_slots table NOT found');
    }

    // Check timeslots (without underscore)
    console.log('\n--- TIMESLOTS TABLE (without underscore) ---');
    try {
      const [timeslots] = await connection.query('SELECT * FROM timeslots LIMIT 5');
      console.log(`✓ timeslots table exists with ${timeslots.length} rows`);
    } catch (e) {
      console.log('✗ timeslots table NOT found');
    }

    // Check foreign keys
    console.log('\n--- FOREIGN KEY CONSTRAINTS ---');
    const [fks] = await connection.query(`
      SELECT CONSTRAINT_NAME, TABLE_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
      FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
      WHERE TABLE_SCHEMA = ?
    `, [process.env.DB_NAME || 'questoria']);
    
    fks.forEach(fk => {
      if (fk.REFERENCED_TABLE_NAME) {
        console.log(`  ${fk.TABLE_NAME}.${fk.COLUMN_NAME} -> ${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME}`);
      }
    });

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkDatabase();
