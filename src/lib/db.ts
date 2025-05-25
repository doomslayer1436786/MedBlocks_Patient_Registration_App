import { PGlite } from '@electric-sql/pglite';
import { BroadcastChannel } from 'broadcast-channel';

interface DBMessage {
  type: 'DB_UPDATED';
}

let db: PGlite | null = null;
const channel = new BroadcastChannel<DBMessage>('db-channel');

const initSQL = `
  CREATE TABLE IF NOT EXISTS patients (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    gender TEXT NOT NULL,
    contact_number TEXT NOT NULL,
    email TEXT,
    address TEXT,
    medical_history TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export async function initializeDB() {
  if (db) return db;

  // Initialize PGlite with IndexedDB persistence
  db = new PGlite('idb://patient-registration-db');
  
  // Execute the initialization SQL
  await db.query(initSQL);

  // Setup cross-tab communication
  channel.onmessage = async (msg: DBMessage) => {
    if (msg.type === 'DB_UPDATED') {
      // Trigger any necessary UI updates
      window.dispatchEvent(new CustomEvent('db-updated'));
    }
  };

  return db;
}

export function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call initializeDB first.');
  }
  return db;
}

export async function notifyDBUpdate() {
  await channel.postMessage({ type: 'DB_UPDATED' });
}

export type Patient = {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: string;
  contact_number: string;
  email?: string;
  address?: string;
  medical_history?: string;
  created_at: string;
}; 