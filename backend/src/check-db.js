import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../sqlite.db');

console.log('Current __filename:', __filename);
console.log('Current __dirname:', __dirname);
console.log('Resolved dbPath:', dbPath);

try {
    const db = new Database(dbPath);
    const userCount = db.prepare('SELECT count(*) as count FROM users').get();
    console.log('Successfully connected to database.');
    console.log('User count:', userCount);
} catch (error) {
    console.error('Failed to connect or query database:', error.message);
}
