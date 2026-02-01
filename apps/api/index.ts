import express from 'express';
import { Pool } from 'pg';

const app = express();
app.use(express.json());

// The host matches the service name in your docker-compose.yml
const pool = new Pool({
    host: 'db',
    user: 'user',
    password: 'password',
    database: 'workout_db',
    port: 5432,
});

// GET route to test connection and fetch time from DB
app.get('/test-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'Connected to DB!', time: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

// POST route to create a temporary 'test' table and insert data
app.post('/test-data', async (req, res) => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS test_logs (id SERIAL PRIMARY KEY, note TEXT)');
        const { note } = req.body;
        const result = await pool.query('INSERT INTO test_logs (note) VALUES ($1) RETURNING *', [note]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

app.listen(3000, () => console.log('API running on port 3000'));