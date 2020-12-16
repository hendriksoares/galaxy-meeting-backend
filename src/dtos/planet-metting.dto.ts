import { IsNotEmpty } from 'class-validator';

export class PlanetMeetingDto {
  @IsNotEmpty()
  planetId: string;
}
