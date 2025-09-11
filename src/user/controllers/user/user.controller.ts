import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

   @ApiBearerAuth() // requires JWT for this route
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.userService.findAll();
  }
}
