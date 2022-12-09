import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './features/auth/auth.service';
import { SignInDto } from './features/auth/dto/signIn.dto';
import { SignUpDto } from './features/auth/dto/signUp.dto';
import { JwtAuthGuard } from './features/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './features/auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('singUp')
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: SignInDto })
  @Post('singIn')
  async signIn(@Request() req) {
    return this.authService.signIn(req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
