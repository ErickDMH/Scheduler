import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UsersService } from '../users/users.service';
import { AuthToken, TokenPayload } from './dto/interfaces';
import { SignUpDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async getTokens(user: UpdateUserDto): Promise<AuthToken> {
    const payload: TokenPayload = {
      name: user.name,
      email: user.email,
      userId: user.id,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_EXP_H,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXP_D,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async signUp(user: SignUpDto): Promise<AuthToken> {
    const userExists = await this.usersService.findOneByEmail(user.email);
    if (userExists !== null) {
      throw new BadRequestException('Email already in use.');
    }

    const userCreated = await this.usersService.create(user);
    const result = await this.getTokens(userCreated);
    const tokenDecoded = this.jwtService.decode(
      result.accessToken
    ) as TokenPayload;
    await this.usersService.update(
      tokenDecoded.userId,
      Object.assign(userCreated, { refreshToken: result.refreshToken })
    );
    return result;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: any) {
    return this.getTokens(user);
  }
}
