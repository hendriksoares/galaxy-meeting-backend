import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Payload } from '@dtos';
import { TravelerService } from '@services';
// import { ContextService } from '@services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private travelerService: TravelerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: Payload) {
    const traveler = await this.travelerService.findOneById(payload.id);

    return { ...traveler };
  }
}
