import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, // full URL here
  entities: [User],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false, // allow self-signed certs
  },
});