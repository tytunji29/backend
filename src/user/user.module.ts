import { Module } from '@nestjs/common';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user/user.service';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([User])], // 👈 register repository
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], 
})
export class UserModule {}
