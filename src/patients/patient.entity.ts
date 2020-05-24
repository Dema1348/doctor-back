import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { LogBook } from 'src/logbooks/logbook.entity';
import { Record } from 'src/records/record.entity';
import { Doctor } from 'src/doctors/doctor.entity';

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

  @ManyToOne(
    type => Doctor,
    doctor => doctor.patients,
  )
  doctor: Doctor;

  @Column({ nullable: true })
  doctorId: number;
}
