// pages/api/votes.js

import sqlite3 from 'sqlite3';
import {open} from 'sqlite';

export default async function handler(req, res) {
    try {
        const db = await open({filename: './mydb.sqlite', driver: sqlite3.Database});

        const images = await db.all('SELECT id, path, elo, votes FROM images ORDER BY id');

        res.status(200).json(images);
    } catch (error) {
        console.error('Error fetching votes:', error);
        res.status(500).json({message: 'Error fetching votes'});
    }
}
