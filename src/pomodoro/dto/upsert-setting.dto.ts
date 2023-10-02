import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { User } from '../../users/user.entity';
import { Transform } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

export class UpsertSettingDTO {
  @ApiHideProperty()
  user: User;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  focusTime?: number = 25;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  shortBreakTime?: number = 5;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  longBreakTime?: number = 15;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsNotEmpty()
  numberOfSessions?: number = 4;
}
