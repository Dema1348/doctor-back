import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Patient } from '../patients/patient.entity';
import { Notification } from '../notifications/notification.entity';

@Entity()
export class Doctor {
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

  @Column({ default: true })
  isActive: boolean;

  @Column()
  tokenFirebase: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(
    type => Patient,
    patient => patient.doctor,
  )
  patients: Patient[];

  @OneToMany(
    type => Notification,
    notification => notification.doctor,
  )
  notifications: Notification[];
}
