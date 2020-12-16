import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '@services';
import { AuthRequest, AuthResponse } from '@dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  signIn(
    @Body() { email, password, keepLogged }: AuthRequest,
  ): Promise<AuthResponse> {
    try {
      return this.authService.singIn(email, password, keepLogged);
    } catch (err) {
      switch (err.code) {
        case 'INVALID_PASSWORD_OR_EMAIL':
          throw new UnauthorizedException('email or password is not valid');
      }
    }
  }
}
