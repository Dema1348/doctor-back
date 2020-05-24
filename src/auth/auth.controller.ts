import { Controller, Request, Get, UseGuards, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ApiResponse, ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { Token } from './token';
import { AuthDto } from './auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, description: 'token user', type: Token })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: AuthDto })
  async loginPatient(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
