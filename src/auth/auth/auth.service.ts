import { Injectable, UnauthorizedException } from '@nestjs/common';
// Update the import path to the correct location of user.service.ts
import { UserService } from '../../user/services/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ResponseDto } from 'src/model/dtos/response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

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
    const response= new ResponseDto ('success', 'Login Successfully',{ access_token: token, user: { id: user.id, email: user.email, role: user.role }});
   
    return response;

  }
}
