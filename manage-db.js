const mysql = require('mysql2/promise');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const manageDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'questoria'
    });

    console.log('Connecting to database...');
    console.log('Database management started.\n');

    // 1. Delete admin user (assuming admin email or first/last name)
    console.log('Step 1: Deleting admin user...');
    try {
      await connection.query('DELETE FROM users WHERE email LIKE ? OR first_name = ?', ['admin%', 'Admin']);
      console.log('✓ Admin user deleted\n');
    } catch (error) {
      console.log('⚠ No admin user found\n');
    }

    // 2. Delete existing testuser and create new one with given credentials
    console.log('Step 2: Setting up test user...');
    
    // Delete existing test user if exists
    try {
      await connection.query('DELETE FROM users WHERE email = ?', ['testuser@example.com']);
      console.log('✓ Old test user deleted');
    } catch (error) {
      console.log('⚠ No old test user found');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('test123456', salt);

    // Create new test user
    await connection.query(
      'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
      ['Test', 'User', 'testuser@example.com', hashedPassword]
    );
    console.log('✓ Test user created with credentials:');
    console.log('  Email: testuser@example.com');
    console.log('  Password: test123456\n');

    // 3. Restore quest rooms
    console.log('Step 3: Restoring quest rooms...');
    
    // Clear existing quests but keep time slots and bookings for reference
    const [existingQuests] = await connection.query('SELECT COUNT(*) as count FROM quests');
    if (existingQuests[0].count > 0) {
      await connection.query('DELETE FROM quests');
      console.log('✓ Old quests cleared');
    }

    // Insert sample quests
    await connection.query(`
      INSERT INTO quests 
      (title, description, price_per_person, min_players, max_players, duration, difficulty, genre, rating, image)
      VALUES 
      ('The Secret of the Kidnapper', 'Solve the mystery of a mysterious kidnapper in this thrilling quest.', 3.00, 1, 4, '1h 30min', 'Ultra hard', 'Horror', 5.0, 'images/img1.png'),
      ('Hunter and prey', 'Experience the ultimate hunt in this intense quest room.', 3.00, 2, 4, '1h 45min', 'Hard', 'Action', 5.0, 'images/img2.png'),
      ('Magium', 'Discover magical secrets in this enchanting quest experience.', 1.00, 1, 3, '1h', 'Easy', 'Fantasy', 4.9, 'images/img3.png')
    `);
    console.log('✓ Quest rooms restored:');
    console.log('  1. The Secret of the Kidnapper (Horror - Ultra hard)');
    console.log('  2. Hunter and prey (Action - Hard)');
    console.log('  3. Magium (Fantasy - Easy)\n');

    // Insert sample time slots for next 5 days
    console.log('Step 4: Refreshing time slots...');
    const times = ['15:30', '17:00', '18:30', '20:00'];
    const today = new Date();

    for (let questId = 1; questId <= 3; questId++) {
      for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
        const date = new Date(today);
        date.setDate(date.getDate() + dayOffset);
        const dateStr = date.toISOString().split('T')[0];

        for (const time of times) {
          await connection.query(
            `INSERT IGNORE INTO timeslots (quest_id, date, time, available_slots, is_available) 
             VALUES (?, ?, ?, 4, true)`,
            [questId, dateStr, time]
          );
        }
      }
    }
    console.log('✓ Time slots restored for next 5 days\n');

    console.log('===== DATABASE MANAGEMENT COMPLETE =====');
    console.log('Test user is ready to login at: http://localhost:5000/login.html');
    console.log('Credentials:');
    console.log('  Email: testuser@example.com');
    console.log('  Password: test123456');

    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('Error managing database:', error);
    process.exit(1);
  }
};

manageDatabase();
