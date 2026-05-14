const mysql = require('mysql2/promise');
require('dotenv').config();

const fixDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'questoria'
    });

    console.log('Fixing database table naming...\n');

    // First, drop the foreign key from bookings table
    console.log('Step 1: Removing old foreign key...');
    try {
      await connection.query(`
        ALTER TABLE bookings 
        DROP FOREIGN KEY bookings_ibfk_2
      `);
      console.log('✓ Old foreign key removed\n');
    } catch (error) {
      console.log('⚠ Foreign key may not exist\n');
    }

    // Rename time_slots to timeslots
    console.log('Step 2: Renaming time_slots to timeslots...');
    await connection.query('RENAME TABLE time_slots TO timeslots');
    console.log('✓ Table renamed\n');

    // Add new foreign key
    console.log('Step 3: Adding corrected foreign key...');
    await connection.query(`
      ALTER TABLE bookings 
      ADD CONSTRAINT bookings_ibfk_2 
      FOREIGN KEY (time_slot_id) REFERENCES timeslots(id) 
      ON DELETE CASCADE ON UPDATE CASCADE
    `);
    console.log('✓ Foreign key corrected\n');

    console.log('===== DATABASE FIX COMPLETE =====');
    console.log('The booking foreign key constraint is now fixed.');

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Error fixing database:', error.message);
    process.exit(1);
  }
};

fixDatabase();
