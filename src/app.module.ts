import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { User } from './model/user.entity';
import { Product } from './model/product.entity';
import { Transaction } from './model/transaction.entity';
import { UserVerification } from './model/userverification';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User, Transaction, Product,UserVerification],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
