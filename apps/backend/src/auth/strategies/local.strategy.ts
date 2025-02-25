import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    /**
     * By default, Local Strategy try to parse the 'username' in object request
     * override the default 'username' field
     */
    super({ usernameField: 'email' });
  }

  /**
   * passport will append the 'user' field to the request object with the value received from verifyUser
   * in this case, verifyUser will return an actual user if credentials is valid
   */
  async validate(username: string, password: string) {
    return this.authService.verifyUser(username, password);
  }
}
