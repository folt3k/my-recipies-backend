import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth.guards';
import { AuthService } from './auth.service';
import { SkipAuth } from './auth.decorators';
import { UserModel } from '../user/user.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: UserModel }) {
    return this.authService.login(req.user);
  }
}
