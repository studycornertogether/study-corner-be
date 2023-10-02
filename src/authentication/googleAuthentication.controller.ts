import { Controller, Post, Body, Req, Get, UseGuards } from '@nestjs/common';
import { TokenVerificationDto } from './tokenVerification.dto';
import { GoogleAuthenticationService } from './googleAuthentication.service';
import { Request } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('google-authentication')
@ApiTags('authentication')
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  @ApiBody({ type: TokenVerificationDto })
  async authenticate(
    @Body() tokenData: TokenVerificationDto,
    @Req() request: Request,
  ) {
    const { accessTokenCookie, refreshTokenCookie, user } =
      await this.googleAuthenticationService.authenticate(
        tokenData.token,
        tokenData.referralCode,
      );
    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return { message: 'Login successfully', result: user };
  }
}
