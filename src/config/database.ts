import { DataSource } from 'typeorm';
import { User } from '../model/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, 
  entities: [User],
  synchronize: true,
  ssl: {
    rejectUnauthorized: false, 
  },
});