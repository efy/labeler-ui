import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const DB_PATH = process.env.DB_PATH || './tasks.sqlite'; 
const schema = `
-- Task table
CREATE TABLE IF NOT EXISTS Task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    -- task data
    data BLOB NOT NULL,
    annotations BLOB,

    -- label template to use
    template TEXT
);
`
export const openDb = async () => {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database,
  });

  // Look away
  await db.exec(schema);

  return db;
};
