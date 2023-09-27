import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserReferral } from './user-referal.entity';
import { Planet } from '../planets/planet.entity';

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

  @Column({ name: 'avatar', nullable: true })
  avatar?: string;

  @Column({ name: 'referral_code', unique: true })
  referralCode: string;

  @CreateDateColumn({ name: 'created_date' })
  createdDate: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  @Exclude()
  updatedDate: Date;

  // Relationships
  @OneToOne(
    () => UserReferral,
    (userReferral: UserReferral) => userReferral.referrerId,
  )
  referringBy?: UserReferral;

  @OneToMany(() => Planet, (planet: Planet) => planet.user)
  planets: Planet[];
}
