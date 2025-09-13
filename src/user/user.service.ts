import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../model/dtos/request/create-user.dto';
import { ResponseDto, UserDto } from 'src/model/dtos/response.dto';
import { UserVerification } from 'src/model/userverification';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserVerification)// 👈 fixed
    private readonly userOtpRepository: Repository<UserVerification>, // 👈 fixed
  ) { }

  async saveotp(userId: string, code: string): Promise<boolean> {
    try {
      await this.userOtpRepository.save({ userId, code });
      return true;
    } catch {
      return false;
    }
  }
  //update password and delete otp
  async updatePassword(userId: number, newPassword: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) return false;
      user.password = await bcrypt.hash(newPassword, 10);
      await this.userRepository.save(user);
      await this.userOtpRepository.delete({ userId: userId.toString() });
      return true;
    } catch {
      return false;
    }
  }

  async findOtp(userId: string): Promise<string | null> {
    const userOtp = await this.userOtpRepository.findOne({
      where: { userId },
    });
    return userOtp ? userOtp.code : null;
  }

  async create(createUserDto: CreateUserDto): Promise<ResponseDto<User | null>> {
    //find by email and if it exist return record
    createUserDto.email = createUserDto.email.toLowerCase().trim();
    createUserDto.password = createUserDto.password.trim();
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      return new ResponseDto('success', 'User Already Exist', null);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepository.create({ ...createUserDto, password: hashedPassword });
    const savedUser = await this.userRepository.save(user);
    return new ResponseDto('success', 'User created successfully', savedUser);
  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userRepository.find();
    return users.map(u => ({
      id: u.id,
      fullName: `${u.firstName} ${u.lastName}`,
      email: u.email,
      role: u.role,
    }));
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }
  async findById(id: number): Promise<UserDto | null> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) return null;
    return {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
    };
  }

}
