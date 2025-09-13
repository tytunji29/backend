import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ConfirmPasswordResetUserDto, LoginUserDto, PasswordResetUserDto } from '../model/dtos/login-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginUserDto) {
    const { email, password } = loginDto;
    return this.authService.login(email, password);
  }
  @Post('initiateresetpassword')
  async initiateresetpassword(@Body() loginDto: PasswordResetUserDto) {
    const { email } = loginDto;
    return this.authService.resetpassword(email);
  }
  @Post('confirmresetpassword')
  async confirmresetpassword(@Body() loginDto: ConfirmPasswordResetUserDto) {
    const { email, otp, newpassword } = loginDto;
    return this.authService.confirmresetpassword(email, otp, newpassword);
  }

  
}
