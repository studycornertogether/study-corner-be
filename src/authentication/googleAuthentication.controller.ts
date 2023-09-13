import {
  Controller,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Req,
} from '@nestjs/common';
import { TokenVerificationDto } from './tokenVerification.dto';
import { GoogleAuthenticationService } from './googleAuthentication.service';
import { Request } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('google-authentication')
@ApiTags('authentication')
@UseInterceptors(ClassSerializerInterceptor)
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
    const { accessTokenCookie, user } =
      await this.googleAuthenticationService.authenticate(tokenData.token);
    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return user;
  }
}
