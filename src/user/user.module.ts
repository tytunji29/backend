import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '../model/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserVerification } from 'src/model/userverification';
@Module({
  imports: [TypeOrmModule.forFeature([User,UserVerification])], // 👈 register repository
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], 
})
export class UserModule {}
