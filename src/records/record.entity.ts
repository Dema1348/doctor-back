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
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  threwUp: number;

  @Column()
  diarrhea: number;

  @Column()
  constipation: number;

  @Column()
  pain: number;

  @Column()
  fatigue: number;

  @Column()
  appetite: number;

  @Column()
  fever: number;

  @Column()
  cold: number;

  @Column()
  urinals: number;

  @Column()
  igc: number;

  @Column()
  assignedDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(
    type => Patient,
    patient => patient.records,
  )
  patient: Patient;

  @Column({ nullable: true })
  patientId: number;
}
