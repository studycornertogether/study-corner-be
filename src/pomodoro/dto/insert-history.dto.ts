import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PomodoroSessionStatus } from '../../enum/pomodoro-session-status.enum';
import { PomodoroSessionType } from '../../enum/pomodoro-session-type.enum';
import { ApiHideProperty } from '@nestjs/swagger';
import { User } from '../../users/user.entity';
import { Type } from 'class-transformer';

export class InsertHistoryDTO {
  @ApiHideProperty()
  user: User;

  @IsNumber()
  @IsNotEmpty()
  focusTime: number;

  @IsNumber()
  @IsNotEmpty()
  session: number;

  @IsNotEmpty()
  @IsEnum(PomodoroSessionType)
  typeOfSession: PomodoroSessionType;

  @IsNotEmpty()
  @IsEnum(PomodoroSessionStatus)
  status: PomodoroSessionStatus;

  @IsString()
  @IsOptional()
  timeRemain?: string;
}
