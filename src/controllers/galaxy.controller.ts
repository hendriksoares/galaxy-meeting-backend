import {
  BadGatewayException,
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { GalaxyService } from '@services';
import { JwtGuard } from 'guards';

@Controller('galaxy')
export class GalaxyController {
  constructor(private readonly galaxyService: GalaxyService) {}
  /**
   * Endpoint to return all galaxies, with planets and travelers
   */
  @UseGuards(JwtGuard)
  @Get()
  async GetAll(): Promise<any> {
    try {
      return this.galaxyService.getAll();
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }
}
