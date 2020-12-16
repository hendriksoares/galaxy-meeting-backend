import { BadGatewayException, Controller, Get } from '@nestjs/common';
import { GalaxyService } from '@services';

@Controller('galaxy')
export class GalaxyController {
  constructor(private readonly galaxyService: GalaxyService) {}
  /**
   * Endpoint to return all galaxies, with planets and travelers
   */
  @Get()
  async GetAll(): Promise<any> {
    try {
      return this.galaxyService.getAll();
    } catch (err) {
      throw new BadGatewayException(err);
    }
  }
}
