import { AuthResponse, Payload } from '@dtos';
import { Injectable } from '@nestjs/common';
import { TravelerService } from './traveler.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly travelerService: TravelerService,
    private readonly jwtService: JwtService,
  ) {}

  async singIn(
    email: string,
    password: string,
    keepLogged = false,
  ): Promise<AuthResponse> {
    const traveler = await this.travelerService.findOneByEmail(email, true);

    if (!traveler) {
      throw { code: 'INVALID_PASSWORD_OR_EMAIL' };
    }
    /* validate password */
    const isValid = await this.validate(password, traveler.user.hash);
    if (!isValid) {
      throw { code: 'INVALID_PASSWORD_OR_EMAIL' };
    }

    /** generate access token */
    const payload: Payload = { id: traveler.id };
    let expiresIn = process.env.JWT_EXPIRES_DEFAULT;
    if (keepLogged) {
      expiresIn = process.env.JWT_EXPIRES_LONG;
    }
    const token = this.jwtService.sign(payload, { expiresIn });
    return { token };
  }

  async validate(pass: string, hash: string): Promise<any> {
    return await bcrypt.compare(pass, hash);
  }
}
