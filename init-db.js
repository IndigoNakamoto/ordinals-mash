const sqlite3 = require('sqlite3');
const {open} = require('sqlite');

(async () => {
    try {
        const db = new sqlite3.Database('facemash.db'); // Change this to your actual database file

        await db.exec(`
      CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY,
        path TEXT NOT NULL,
        elo INTEGER NOT NULL,
        votes INTEGER NOT NULL
      );
    `);

        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
})();
