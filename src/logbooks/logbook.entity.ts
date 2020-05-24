import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Patient } from 'src/patients/patient.entity';

@Entity()
export class LogBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  assignedDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(
    type => Patient,
    patient => patient.logBooks,
  )
  patient: Patient;

  @Column({ nullable: true })
  patientId: number;
}
