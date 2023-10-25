import { DataSource } from "typeorm"
import { config } from 'dotenv';
config()
export const db = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST || "localhost",
    port: Number(process.env.PG_PORT) || 5432,
    username: process.env.PG_USERNAME || "postgres",
    password: process.env.PG_PASSWORD || "postgres",
    synchronize: true,
    database: process.env.PG_DATABASE || "zehn",
    entities: ["src/entity/*.js", "src/entity/*.ts"],
})