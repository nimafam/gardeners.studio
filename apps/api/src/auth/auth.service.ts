import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  Get,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import type { RefreshToken } from '@prisma/client';
import { CurrentUser } from './types/current-user.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configServic: ConfigService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
      include: {
        roles: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roles = user.roles.map((userRole) => userRole.role.slug);

    const tokens = await this.generateTokens({
      id: user.id,
      email: user.email,
      roles: roles,
    });

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles,
      },
    };
  }

  private async generateTokens(user: {
    id: string;
    email: string;
    roles: string[];
  }) {
    const payload = {
      sub: user.id,
      email: user.email,
      roles: user.roles,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configServic.getOrThrow<string>('jwt.refreshSecret'),
      expiresIn: this.configServic.getOrThrow('jwt.refreshExpiresIn'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async saveRefreshToken(userId: string, refreshToken: string) {
    const tokenHash = await bcrypt.hash(refreshToken, 10);

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 100),
      },
    });
  }

  async refresh(refreshToken: string) {
    let payload: {
      sub: string;
      email: string;
      roles: string[];
    };

    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configServic.getOrThrow<string>('jwt.refreshSecret'),
      });
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }

    console.log('here');

    const storedTokens = await this.prisma.refreshToken.findMany({
      where: {
        userId: payload.sub,
        revokeAt: null,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    const matchedToken = await this.findMatchingrefershtoken(
      refreshToken,
      storedTokens,
    );

    if (!matchedToken) {
      throw new ForbiddenException('Invalid Refersh Token');
    }

    await this.prisma.refreshToken.update({
      where: {
        id: matchedToken.id,
      },
      data: {
        revokeAt: new Date(),
      },
    });

    const tokens = await this.generateTokens({
      id: payload.sub,
      email: payload.email,
      roles: payload.roles,
    });

    await this.saveRefreshToken(payload.sub, tokens.refreshToken);

    return tokens;
  }

  private async findMatchingrefershtoken(
    refershToken: string,
    storedTokens: RefreshToken[],
  ): Promise<RefreshToken | null> {
    for (const token of storedTokens) {
      const isMatched = await bcrypt.compare(refershToken, token.tokenHash);

      if (isMatched) {
        return token;
      }
    }

    return null;
  }

  me(user: CurrentUser) {
    return user;
  }
}
