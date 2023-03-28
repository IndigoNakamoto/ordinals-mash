const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const db = new sqlite3.Database('facemash.db'); // Change this to your actual database file

const imagesFolderPath = path.join(__dirname, 'public', 'images');

// Create the 'images' table if it doesn't exist
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY,
      path TEXT NOT NULL,
      elo REAL DEFAULT 1200
    )`);

    // Read image filenames from the 'public/images' folder
    fs.readdir(imagesFolderPath, (err, files) => {
        if (err) {
            console.error('Error reading images folder:', err);
            return;
        }

        // Insert image paths into the 'images' table
        files.forEach((file) => {
            if (path.extname(file) === '.png') {
                const imagePath = path.join('images', file);
                db.run('INSERT INTO images (path) VALUES (?)', [imagePath], (err) => {
                    if (err) {
                        console.error('Error inserting image path into the database:', err);
                    } else {
                        console.log(`Inserted image path: ${imagePath}`);
                    }
                });
            }
        });
    });
});
