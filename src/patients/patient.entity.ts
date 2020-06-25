import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { LogBook } from '../logbooks/logbook.entity';
import { Record } from '../records/record.entity';
import { Doctor } from '../doctors/doctor.entity';
import { Notification } from '../notifications/notification.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ select: false })
  password: string;

  @Column()
  cellPhone: string;

  @Column({ unique: true })
  run: string;

  @Column()
  stage: string;

  @Column()
  treatment: string;

  @Column()
  cellPhoneContact: string;

  @Column()
  nameContact: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(
    type => LogBook,
    logBook => logBook.patient,
  )
  logBooks: LogBook[];

  @OneToMany(
    type => Record,
    record => record.patient,
  )
  records: Record[];

  @OneToMany(
    type => Notification,
    notification => notification.patient,
  )
  notifications: Notification[];

  @ManyToOne(
    type => Doctor,
    doctor => doctor.patients,
  )
  doctor: Doctor;

  @Column({ nullable: true })
  doctorId: number;
}
