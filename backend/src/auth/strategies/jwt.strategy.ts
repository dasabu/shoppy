import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      // where to find jwt from request (can have many ways to extract jwt)
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request.cookies.Authentication;
        },
        /**
         * ExtractJwt.fromAuthHeaderAsBearerToken: extract jwt from request header (Authorization key)
         */
      ]),
      // if a route is supplied with an expired JWT, the request will be denied and a 401 Unauthorized response sent
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    });
  }
  /**
   * Passport will build a 'user' object based on the return value of our validate() method
   * and attach it as a property on the Request object
   **/
  validate(payload: TokenPayload) {
    return payload;
  }
}
