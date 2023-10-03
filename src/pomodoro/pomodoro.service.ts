import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PomodoroSetting } from './pomodoro-setting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpsertSettingDTO } from './dto/upsert-setting.dto';
import { User } from '../users/user.entity';
import { InsertHistoryDTO } from './dto/insert-history.dto';
import { PomodoroSessionStatus } from '../enum/pomodoro-session-status.enum';
import { PomodoroHistory } from './pomodoro-history.entity';

@Injectable()
export class PomodoroService {
  constructor(
    @InjectRepository(PomodoroSetting)
    private readonly pomodoroSettingRepository: Repository<PomodoroSetting>,
    @InjectRepository(PomodoroHistory)
    private readonly pomodoroHistoryRepository: Repository<PomodoroHistory>,
  ) {}

  async upsertSetting(upsertSettingDTO: UpsertSettingDTO) {
    try {
      await this.pomodoroSettingRepository.upsert(upsertSettingDTO, {
        conflictPaths: ['userId'],
        skipUpdateIfNoValuesChanged: true,
      });
    } catch (err) {
      Logger.log(err);
      throw new BadRequestException('Can not set-up.');
    }
    return { message: 'Setup successfully.' };
  }

  async getSetting(user: User) {
    const result = await this.pomodoroSettingRepository.findOne({
      where: { userId: user.id },
    });
    return { result };
  }

  async insertHistory(insertHistoryDTO: InsertHistoryDTO) {
    const { user, focusTime, session, status, typeOfSession, timeRemain } =
      insertHistoryDTO;

    const history = this.pomodoroHistoryRepository.create({
      user,
      focusTime,
      session,
      status,
      typeOfSession,
      timeRemain,
    });

    await this.pomodoroHistoryRepository.save(history);
    delete history.user;
    return { result: history };
  }

  async getLastHistory(user: User) {
    const result = await this.pomodoroHistoryRepository.findOne({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
    });
    return { result };
  }
}
