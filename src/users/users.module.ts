import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserReferral } from './user-referal.entity';
import { UsersController } from './users.controller';
import { PomodoroModule } from '../pomodoro/pomodoro.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserReferral]), PomodoroModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
