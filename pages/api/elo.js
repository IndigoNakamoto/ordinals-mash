import sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import {calculateNewElo} from '../../utils/elo';

export default async function handler(req, res) {
    const db = await open({filename: './facemash.db', driver: sqlite3.Database});

    if (req.method === 'GET') {
        try {
            const images = await db.all('SELECT * FROM images ORDER BY RANDOM() LIMIT 2');
            if (images.length === 2) {
                res.status(200).json({image1: images[0], image2: images[1]});
            } else {
                res.status(500).json({error: 'Failed to fetch images from database'});
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            res.status(500).json({error: 'Error fetching images from database'});
        }
    } else if (req.method === 'POST') {
        const {winner_id, loser_id} = req.body;
        try {
            const winner = await db.get('SELECT * FROM images WHERE id = ?', winner_id);
            const loser = await db.get('SELECT * FROM images WHERE id = ?', loser_id);

            const [newWinnerElo, newLoserElo] = calculateNewElo(winner.elo, loser.elo);

            await db.run('UPDATE images SET elo = ? WHERE id = ?', newWinnerElo, winner_id);
            await db.run('UPDATE images SET elo = ? WHERE id = ?', newLoserElo, loser_id);

            res.status(200).json({message: 'Elo ratings updated successfully'});
        } catch (error) {
            console.error('Error updating Elo ratings:', error);
            res.status(500).json({error: 'Error updating Elo ratings'});
        }
    } else {
        res.status(405).json({error: 'Invalid request method'});
    }

    await db.close();
}
