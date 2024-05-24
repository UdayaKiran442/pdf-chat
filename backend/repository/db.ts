import {neon} from '@neondatabase/serverless'
import {drizzle} from 'drizzle-orm/neon-http';
import dotenv from 'dotenv'
dotenv.config()

const connectionURL = process.env.NEON_DATABASE_URL as string
const sql = neon(connectionURL)
const db = drizzle(sql);

export default db;