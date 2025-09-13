import { Injectable, UnauthorizedException } from '@nestjs/common';
// Update the import path to the correct location of user.service.ts
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from 'src/model/dtos/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) { }

  async login(email: string, password: string) {
    email = email.toLowerCase().trim();
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    // Create JWT payload
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);

    // Return the token and user info in the response
    const response = new ResponseDto('success', 'Login Successfully', { access_token: token, user: { id: user.id, email: user.email, role: user.role } });

    return response;

  }
  async confirmresetpassword(email: string, code: string, newPassword: string) {
    let response = new ResponseDto<string>('error', ' An Error Occured during password reset');
    email = email.toLowerCase().trim();
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User Not Found');
    var rec = await this.userService.findOtp(user.id.toString());
    if (!rec)
      response = new ResponseDto('fail', 'Wrong OTP', '');
    //update password and delete the otp verification
    if (rec === code) {
      const updated = await this.userService.updatePassword(user.id, newPassword);
      if (updated) {
        response = new ResponseDto('success', 'Password reset successfully', '');
      }
    }
    else
      response = new ResponseDto('fail', 'Wrong OTP', '');
    return response;
  }
  async resetpassword(email: string) {
    let response = new ResponseDto<string>('error', 'Password reset initiation failed');
    email = email.toLowerCase().trim();
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    //generate unique 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    //store the code to the UserVerification table
    var rec = await this.userService.saveotp(user.id.toString(), code);
    if (rec)
      response = new ResponseDto('success', 'Password Reset Was Initiated Successfully', code);
    else
      response = new ResponseDto('fail', 'An Error occurred', '');
    // Return the token and user info in the response
    return response;
  }
}
