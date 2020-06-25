import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Patient } from 'src/patients/patient.entity';
import { Doctor } from 'src/doctors/doctor.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column()
  read: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(
    type => Patient,
    patient => patient.notifications,
  )
  patient: Patient;

  @Column({ nullable: true })
  patientId: number;

  @ManyToOne(
    type => Doctor,
    doctor => doctor.notifications,
  )
  doctor: Doctor;

  @Column({ nullable: true })
  doctorId: number;
}
