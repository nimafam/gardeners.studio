import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { JwtAuthGaurd } from './gaurd/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import type { CurrentUser as CurrentUserType } from './types/current-user.type';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './gaurd/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto.refreshToken);
  }

  @Get('me')
  @UseGuards(JwtAuthGaurd, RolesGuard)
  @Roles('owner')
  me(@CurrentUser() user: CurrentUserType) {
    return this.authService.me(user);
  }
}
