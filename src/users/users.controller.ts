import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { InputReferralCodeDTO } from './dto/input-referral-code.dto';
import { ApiTags } from '@nestjs/swagger';
import RequestWithUser from '../authentication/requestWithUser.interface';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('referral-code')
  @UseGuards(JwtAuthenticationGuard)
  async inputReferralCode(
    @Body() data: InputReferralCodeDTO,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    return this.usersService.inputReferralCode(user, data);
  }
}
