import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PomodoroSetting } from './pomodoro-setting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpsertSettingDTO } from './dto/upsert-setting.dto';
import { User } from '../users/user.entity';

@Injectable()
export class PomodoroService {
  constructor(
    @InjectRepository(PomodoroSetting)
    private readonly pomodoroSettingRepository: Repository<PomodoroSetting>,
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
}
