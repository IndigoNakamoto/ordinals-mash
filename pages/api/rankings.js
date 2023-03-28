import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const db = await open({filename: './facemash.db', driver: sqlite3.Database});

            const topImages = await db.all('SELECT * FROM images ORDER BY elo DESC LIMIT 5');
            const bottomImages = await db.all('SELECT * FROM images ORDER BY elo ASC LIMIT 5');

            await db.close();

            res.status(200).json({topImages, bottomImages});
        } catch (error) {
            console.error('Error fetching rankings:', error);
            res.status(500).json({error: 'Error fetching rankings from database'});
        }
    } else {
        res.status(405).json({error: 'Invalid request method'});
    }
}
