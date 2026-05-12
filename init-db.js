const mysql = require('mysql2/promise');
require('dotenv').config();

const initDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
      database: process.env.DB_NAME || 'questoria'
    });

    // Create Users table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB CHARSET=utf8mb4
    `);
    console.log('Users table created');

    // Create Quests table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS quests (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price_per_person DECIMAL(10, 2) NOT NULL,
        min_players INT DEFAULT 1,
        max_players INT DEFAULT 4,
        duration VARCHAR(50),
        difficulty ENUM('Easy', 'Medium', 'Hard', 'Ultra hard') DEFAULT 'Medium',
        genre VARCHAR(100),
        rating DECIMAL(3, 1) DEFAULT 5.0,
        image VARCHAR(255),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB CHARSET=utf8mb4
    `);
    console.log('Quests table created');

    // Create TimeSlots table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS time_slots (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        quest_id INT NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        available_slots INT DEFAULT 4,
        is_available BOOLEAN DEFAULT true,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (quest_id) REFERENCES quests(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB CHARSET=utf8mb4
    `);
    console.log('TimeSlots table created');

    // Create Bookings table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        time_slot_id INT NOT NULL,
        number_of_people INT NOT NULL,
        total_price DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
        booking_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
        FOREIGN KEY (time_slot_id) REFERENCES time_slots(id) ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB CHARSET=utf8mb4
    `);
    console.log('Bookings table created');

    // Insert sample quests
    await connection.query(`
      INSERT IGNORE INTO quests 
      (title, description, price_per_person, min_players, max_players, duration, difficulty, genre, rating, image)
      VALUES 
      ('The Secret of the Kidnapper', 'Solve the mystery of a mysterious kidnapper in this thrilling quest.', 3.00, 1, 4, '1h 30min', 'Ultra hard', 'Horror', 5.0, 'images/img1.png'),
      ('Hunter and prey', 'Experience the ultimate hunt in this intense quest room.', 3.00, 2, 4, '1h 45min', 'Hard', 'Action', 5.0, 'images/img2.png'),
      ('Magium', 'Discover magical secrets in this enchanting quest experience.', 1.00, 1, 3, '1h', 'Easy', 'Fantasy', 4.9, 'images/img3.png')
    `);
    console.log('Sample quests inserted');

    // Insert sample time slots for next 5 days
    const times = ['15:30', '17:00', '18:30', '20:00'];
    const today = new Date();

    for (let questId = 1; questId <= 3; questId++) {
      for (let dayOffset = 0; dayOffset < 5; dayOffset++) {
        const date = new Date(today);
        date.setDate(date.getDate() + dayOffset);
        const dateStr = date.toISOString().split('T')[0];

        for (const time of times) {
          await connection.query(
            `INSERT IGNORE INTO time_slots (quest_id, date, time, available_slots, is_available) 
             VALUES (?, ?, ?, 4, true)`,
            [questId, dateStr, time]
          );
        }
      }
    }
    console.log('Sample time slots inserted');

    await connection.end();
    console.log('Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

initDatabase();
