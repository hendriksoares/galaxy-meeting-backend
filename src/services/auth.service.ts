import { AuthResponse } from '@dtos';
import { Injectable } from '@nestjs/common';
import { TravelerService } from './traveler.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly travelerService: TravelerService) {}

  async singIn(email: string, password: string): Promise<AuthResponse> {
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
    const token = '';
    return { token };
  }
  async validate(pass: string, hash: string): Promise<any> {
    return await bcrypt.compare(pass, hash);
  }
}
