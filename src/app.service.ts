import { Injectable } from '@nestjs/common';
import { UserService } from './modules/user/user.service';

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}
  async getHello(): Promise<string> {
    await this.userService.getHello();

    return 'Hello World!';
  }
}
