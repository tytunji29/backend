import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { CreateUserDto } from '../model/dtos/request/create-user.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ResponseDto } from 'src/model/dtos/response.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    const users = await this.userService.findAll();
    if (!users || users.length === 0) {
      return new ResponseDto('error', 'No users found');
    }
    return new ResponseDto('success', 'Users found', users);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    const user = await this.userService.findById(Number(id));
    if (!user) {
      return new ResponseDto('error', 'User not found');
    }
    return new ResponseDto('success', 'User found', user);
  }
}
