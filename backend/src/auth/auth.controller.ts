import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * When '/login' route is called, run the local-auth guard first. It will trigger the local strategy,
   * which will take the 'email' and 'password' in request body to 'validate'
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login() {}
}
