import { Traveler } from '@entities';
import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { TravelerService } from '@services';
import { TravelerCreateDto } from '@dtos';

@Controller('traveler')
export class TravelerController {
  constructor(private readonly travelerService: TravelerService) {}

  @Post('create')
  async createOne(
    @Body() travelerCreate: TravelerCreateDto,
  ): Promise<Traveler> {
    try {
      return await this.travelerService.createOne(travelerCreate);
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
