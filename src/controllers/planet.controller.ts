import { Traveler } from '@entities';
import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PlanetService } from '@services';
import { PlanetMeetingDto } from '@dtos';
import { Current } from 'decorators';
import { JwtGuard } from 'guards';

@Controller('planet')
export class PlanetController {
  constructor(private readonly planetService: PlanetService) {}
  /**
   * A endpoint to join in webconference planet
   */
  @UseGuards(JwtGuard)
  @Post('meeting/join')
  @HttpCode(200)
  async meetingJoin(
    @Current() traveler: Traveler,
    @Body() { planetId }: PlanetMeetingDto,
  ): Promise<Traveler> {
    try {
      return await this.planetService.join(planetId, traveler.id);
    } catch (err) {
      switch (err.code) {
        case 'TRAVELER_NOTFOUND':
          throw new BadRequestException('Traveler not found');
        case 'PLANET_NOTFOUND':
          throw new BadRequestException('Planet not found');
        default:
          throw new BadGatewayException(err);
      }
    }
  }
}
