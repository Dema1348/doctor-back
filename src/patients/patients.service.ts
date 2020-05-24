import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import * as bcrypt from 'bcrypt';
import {
  CreateUpdatePatientDto,
  PatientIncludeLogBookDto,
  PatientIncludeRecordDto,
} from './patient.dto';

@Injectable()
export class PatientsService {
  saltRounds = 10;

  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}

  findOne(id: number): Promise<CreateUpdatePatientDto> {
    return this.patientRepository.findOne(id);
  }

  findLogbooks(id: number): Promise<PatientIncludeLogBookDto> {
    return this.patientRepository.findOne(id, {
      relations: ['logBooks'],
    });
  }

  findRecords(id: number): Promise<PatientIncludeRecordDto> {
    return this.patientRepository.findOne(id, {
      relations: ['records'],
    });
  }

  findByEmail(email: string): Promise<CreateUpdatePatientDto> {
    return this.patientRepository.findOne({
      where: {
        email,
      },
      select: [
        'password',
        'email',
        'id',
        'firstName',
        'lastName',
        'password',
        'cellPhone',
      ],
    });
  }

  findAll(): Promise<CreateUpdatePatientDto[]> {
    return this.patientRepository.find();
  }

  async create(
    patientData: CreateUpdatePatientDto,
  ): Promise<CreateUpdatePatientDto> {
    const userHash = { ...patientData };
    userHash.password = bcrypt.hashSync(userHash.password, this.saltRounds);
    return this.patientRepository.save(userHash);
  }

  async update(
    id: number,
    patientData: CreateUpdatePatientDto,
  ): Promise<boolean> {
    await this.patientRepository.update(id, patientData);
    return true;
  }

  async remove(id: number): Promise<boolean> {
    await this.patientRepository.delete(id);
    return true;
  }
}
