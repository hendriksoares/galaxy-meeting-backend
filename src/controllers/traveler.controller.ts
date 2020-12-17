import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService, TravelerService } from '@services';
import { AuthResponse, TravelerCreateDto } from '@dtos';

@Controller('traveler')
export class TravelerController {
  constructor(
    private readonly travelerService: TravelerService,
    private readonly authService: AuthService,
  ) {}

  @Post('create')
  async createOne(
    @Body() travelerCreate: TravelerCreateDto,
  ): Promise<AuthResponse> {
    try {
      await this.travelerService.createOne(travelerCreate);
      return this.authService.singIn(
        travelerCreate.email,
        travelerCreate.password,
      );
    } catch (err) {
      switch (err.code) {
        case '23505': // postgres code to duplicate entrie
          throw new BadRequestException('email already register');
        default:
          throw new BadGatewayException();
      }
    }
  }
}
