import { Injectable } from '@nestjs/common';
import { UserService } from '../features/user/user.service';
@Injectable()
export class SeedService {
  constructor(private userService: UserService) {}

  async seed(): Promise<void> {
    const users = [
      { login: 'ola', password: 'haslo123' },
      { login: 'folt3k', password: 'haslo123' },
    ];

    await Promise.all(users.map((u) => this.userService.createUser(u)));
  }
}
