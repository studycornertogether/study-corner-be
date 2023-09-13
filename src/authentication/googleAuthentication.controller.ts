import {
  Controller,
  Post,
  ClassSerializerInterceptor,
  UseInterceptors,
  Body,
  Req,
} from '@nestjs/common';
import { TokenVerificationDto } from './tokenVerificationDto';
import { GoogleAuthenticationService } from './googleAuthentication.service';
import { Request } from 'express';

@Controller('google-authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class GoogleAuthenticationController {
  constructor(
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  async authenticate(
    @Body() tokenData: TokenVerificationDto,
    @Req() request: Request,
  ) {}
}
