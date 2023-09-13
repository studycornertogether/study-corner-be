import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  Res,
  UseGuards,
  Get,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import JwtAuthenticationGuard from './jwt-authentication.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @HttpCode(200)
  @Post('log-in')
  async logIn(@Body('email') email: string, @Res() response: any) {
    const cookie = this.authenticationService.getCookieWithJwtToken(email);
    response.setHeader('Set-Cookie', cookie);
    return response.send('Login successfully.');
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser, @Res() response: any) {
    response.setHeader(
      'Set-Cookie',
      this.authenticationService.getCookieForLogOut(),
    );
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }
}
