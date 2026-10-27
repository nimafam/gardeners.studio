import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import type { CurrentUser } from '../types/current-user.type';
import { UsersService } from 'src/users/users.service';
import { JwtPaload } from '../types/jwt-payload.type';
import { UserStatus } from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: configService.getOrThrow<string>('jwt.accessSecret'),
    });
  }

  async validate(
    payload: JwtPaload,
  ): Promise<CurrentUser | UnauthorizedException> {
    const user = await this.usersService.findAuthenticatedUserById(payload.sub);

    if (!user) {
      return new UnauthorizedException('User not found');
    }

    if (user.deletedAt) {
      throw new UnauthorizedException('User has been deleted');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('User is not active');
    }

    return {
      userId: user.id,
      email: user.email,

      roles: user.roles.map((userRole) => userRole.role.slug),
    };
  }
}
