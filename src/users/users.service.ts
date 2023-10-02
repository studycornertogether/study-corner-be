import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as VoucherCodes from 'voucher-code-generator';
import { InputReferralCodeDTO } from './dto/input-referral-code.dto';
import { UserReferral } from './user-referal.entity';
import { PomodoroService } from '../pomodoro/pomodoro.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserReferral)
    private userReferralRepository: Repository<UserReferral>,
    private readonly pomodoroService: PomodoroService,
  ) {}

  async getByEmail(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async getByReferralCode(referralCode: string) {
    const user = await this.usersRepository.findOne({
      where: { referralCode },
    });
    return user;
  }

  async createWithGoogle(email: string, name: string, avatar: string) {
    const [referralCode] = VoucherCodes.generate({ count: 1, length: 10 });
    const newUser = await this.usersRepository.create({
      email,
      name,
      avatar,
      referralCode,
    });
    const user = await this.usersRepository.save(newUser);
    await this.pomodoroService.upsertSetting({
      user,
      focusTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,
      numberOfSessions: 4,
    });
    return user;
  }

  async inputReferralCode(user: User, data: InputReferralCodeDTO) {
    const { referralCode } = data;
    if (!referralCode) {
      throw new BadRequestException(`Referral code can not empty.`);
    }
    const referrer = await this.getByReferralCode(referralCode);
    if (!referrer) {
      throw new BadRequestException(
        `User with referral code ${referralCode} not found.`,
      );
    }
    // Check user already input referralCode yet?
    const exists = await this.userReferralRepository.exist({
      where: { userId: user.id },
    });
    if (exists) {
      throw new BadRequestException(
        `Only can input referral code just one time.`,
      );
    }
    // Can not input themselves referralCode
    if (user.id === referrer.id) {
      throw new BadRequestException(`You can not input your referral code`);
    }

    // Insert referralCode success
    await this.userReferralRepository.insert({
      userId: user.id,
      referrerId: referrer.id,
    });
    return { message: 'Input referralCode successfully.' };
  }
}
