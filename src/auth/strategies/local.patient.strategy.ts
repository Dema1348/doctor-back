import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passReqToCallback: true });
  }

  async validate(
    { body: { isPatient } }: any,
    username: string,
    password: string,
  ): Promise<any> {
    let resp;
    if (isPatient) {
      resp = await this.authService.validatePatient(username, password);
    } else {
      resp = await this.authService.validateDoctor(username, password);
    }
    if (!resp) {
      throw new UnauthorizedException();
    }
    return { ...resp, isPatient };
  }
}
