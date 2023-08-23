import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async getHello(): Promise<string> {
    await this.usersRepository.save({ login: 'folt3k', password: 'test' });

    return 'Hello World!';
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(dto);
  }
}
