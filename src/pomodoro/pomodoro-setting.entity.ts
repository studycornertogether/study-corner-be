import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class PomodoroSetting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'focus_time', type: 'int4' })
  focusTime: number;

  @Column({ name: 'short_break_time', type: 'int4' })
  shortBreakTime: number;

  @Column({ name: 'long_break_time', type: 'int4' })
  longBreakTime: number;

  @Column({ name: 'number_of_sessions', type: 'int4' })
  numberOfSessions: number;

  // Relationships
  @OneToOne(() => User, (user: User) => user.pomodoroSetting)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;
}
