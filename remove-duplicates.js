const mysql = require('mysql2/promise');
require('dotenv').config();

const removeDuplicates = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'questoria'
    });

    console.log('Cleaning up duplicate time slots...');

    // Identify duplicates (quest_id, date, time) and keep only the one with the lowest ID
    // Note: This logic assumes no bookings are linked to the duplicates yet, 
    // or if they are, we might need more complex handling.
    
    const [duplicates] = await connection.query(`
      SELECT quest_id, date, time, COUNT(*) as count
      FROM timeslots
      GROUP BY quest_id, date, time
      HAVING count > 1
    `);

    console.log(`Found ${duplicates.length} groups of duplicates.`);

    for (const dup of duplicates) {
      const [ids] = await connection.query(`
        SELECT id FROM timeslots 
        WHERE quest_id = ? AND date = ? AND time = ?
        ORDER BY id ASC
      `, [dup.quest_id, dup.date, dup.time]);

      const idsToRemove = ids.slice(1).map(row => row.id);
      
      if (idsToRemove.length > 0) {
        console.log(`Removing duplicate IDs for ${dup.date} ${dup.time}: ${idsToRemove.join(', ')}`);
        await connection.query(`
          DELETE FROM timeslots WHERE id IN (?)
        `, [idsToRemove]);
      }
    }

    // Add unique index manually if it doesn't exist (Sequelize might have done it, but let's be sure)
    console.log('Adding unique constraint to timeslots...');
    try {
      await connection.query(`
        ALTER TABLE timeslots ADD UNIQUE INDEX unique_slot (quest_id, date, time)
      `);
      console.log('✓ Unique constraint added to timeslots');
    } catch (e) {
      console.log('⚠ Unique constraint might already exist');
    }

    console.log('Adding unique constraint to bookings...');
    try {
      await connection.query(`
        ALTER TABLE bookings ADD UNIQUE INDEX unique_booking_slot (time_slot_id)
      `);
      console.log('✓ Unique constraint added to bookings');
    } catch (e) {
      console.log('⚠ Unique constraint might already exist');
    }

    await connection.end();
    console.log('Cleanup complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error during cleanup:', error.message);
    process.exit(1);
  }
};

removeDuplicates();
