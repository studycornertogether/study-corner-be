import { Module } from '@nestjs/common';
import { PomodoroService } from './pomodoro.service';
import { PomodoroController } from './pomodoro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PomodoroSetting } from './pomodoro-setting.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PomodoroSetting, PomodoroSetting])],
  providers: [PomodoroService],
  controllers: [PomodoroController],
  exports: [PomodoroService],
})
export class PomodoroModule {}
