import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PasswordResetUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  email: string;
}
export class PasswordResetConfirmUserDto {
  @ApiProperty({ example: 'secret123', description: 'User password' })
  @IsNotEmpty()
  newpassword: string;
  @ApiProperty({ example: '123456', description: 'User verification OTP' })
  @IsNotEmpty()
  otp: string;
}
export class ConfirmPasswordResetUserDto extends PasswordResetConfirmUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail()
  email: string;
}

export class LoginUserDto extends PasswordResetUserDto {
 
  @ApiProperty({ example: 'secret123', description: 'User password' })
  @IsNotEmpty()
  password: string;
}
