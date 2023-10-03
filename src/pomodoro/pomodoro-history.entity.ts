import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PomodoroSessionType } from '../enum/pomodoro-session-type.enum';
import { PomodoroSessionStatus } from '../enum/pomodoro-session-status.enum';
import { User } from '../users/user.entity';

@Entity({ name: 'pomodoro_history' })
export class PomodoroHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'focus_time', type: 'int4' })
  focusTime: number;

  @Column()
  session: number;

  @Column({ name: 'type_of_session', enum: PomodoroSessionType })
  typeOfSession: PomodoroSessionType;

  @Column({ name: 'status', enum: PomodoroSessionStatus })
  status: PomodoroSessionStatus;

  @Column({ name: 'time_remain', type: 'varchar', nullable: true })
  timeRemain?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relationships
  @ManyToOne(() => User, (user: User) => user.pomodoroHistories)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
