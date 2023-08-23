import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [PassportModule, UsersModule],
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
