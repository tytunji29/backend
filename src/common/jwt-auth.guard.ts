import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { AuthController } from '../../auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../../config/jwtstrategy';
import { UserModule } from '../../user/user.module'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'yourSecretKey', // use env variable in production
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})

export class JwtAuthGuard extends AuthGuard('jwt') {}
