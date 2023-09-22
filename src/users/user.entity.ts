import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserReferral } from './user-referal.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ name: 'date_of_birth', nullable: true, type: 'timestamptz' })
  @Transform(({ value }) => {
    if (value !== null) {
      return value;
    }
  })
  dateOfBirth?: Date;

  @Column({ name: 'referral_code', unique: true })
  referralCode: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  @Exclude()
  updatedDate: Date;

  @OneToOne(
    () => UserReferral,
    (userReferral: UserReferral) => userReferral.referrerId,
  )
  referringBy?: UserReferral;
}
