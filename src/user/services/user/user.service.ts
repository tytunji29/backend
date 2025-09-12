import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../model/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../../../model/dtos/create-user.dto';
import { ResponseDto } from 'src/model/dtos/response.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // 👈 fixed
  ) {}

  async create(createUserDto: CreateUserDto): Promise<ResponseDto<User | null>> {
    //find by email and if it exist return record
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

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | null> {
  return this.userRepository.findOne({
    where: { email },
  });
}

}
