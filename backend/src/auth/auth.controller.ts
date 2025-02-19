import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * When '/login' route is called, the local-auth guard will run first. It will trigger the local strategy,
   * which will take the 'email' and 'password' in request body and pass into 'validate' function
   *
   * after going through local auth guard, an 'user' property will be assigned in the request
   * need to extract that user, to sign jwt -> @CurrentUser()
   *
   * also need to get the current response object, to set on jwt -> @Res({ passthrough: true })
   * passthrough: true to ensure NestJS still handle the the request-response lifecycle
   * after we handle the response object (continue to run the existing pipeline)
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }
}
