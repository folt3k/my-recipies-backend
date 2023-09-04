import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './auth.guards';
import { AuthService } from './auth.service';
import { SkipAuth } from './auth.decorators';
import { UserModel } from '../user/user.types';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { loginExampleData } from './auth.swagger';
import { LoginDto } from './auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: LoginDto,
    examples: loginExampleData,
  })
  async login(@Request() req: { user: UserModel }) {
    return this.authService.login(req.user);
  }
}
