import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { UpsertSettingDTO } from './dto/upsert-setting.dto';
import RequestWithUser from '../authentication/requestWithUser.interface';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { ApiTags } from '@nestjs/swagger';
import { InsertHistoryDTO } from './dto/insert-history.dto';

@Controller('pomodoro')
@ApiTags('pomodoro')
@UseGuards(JwtAuthenticationGuard)
export class PomodoroController {
  constructor(private readonly pomodoroService: PomodoroService) {}

  @Put('setting')
  upsertSetting(
    @Body() data: UpsertSettingDTO,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request;
    data.user = user;
    return this.pomodoroService.upsertSetting(data);
  }

  @Post('history')
  insertHistory(
    @Body() data: InsertHistoryDTO,
    @Req() request: RequestWithUser,
  ) {
    data.user = request['user'];
    return this.pomodoroService.insertHistory(data);
  }

  @Get('last-activity')
  getLastHistory(@Req() request: RequestWithUser) {
    return this.pomodoroService.getLastActivity(request.user);
  }
}
