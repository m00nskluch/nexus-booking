import { drizzle } from "drizzle-orm/pg-proxy"; // Or postgres-js/node-postgres
import { drizzle as drizzleNode } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzleNode(pool, { schema });
