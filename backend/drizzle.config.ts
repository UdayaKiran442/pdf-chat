import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite"
  out: "./migrations",
  migrations: {
    table: 'migrations_custom', // default `__drizzle_migrations`,
    schema: 'public', // used in PostgreSQL only and default to `drizzle`
  },
  schema: './repository/schema.ts'
});