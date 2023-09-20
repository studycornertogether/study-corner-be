import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class UserReferral {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'referer_id' })
  referrerId: number;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;
}
