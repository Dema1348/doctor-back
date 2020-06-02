import {
  Injectable,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import * as bcrypt from 'bcrypt';
import {
  CreateUpdatePatientDto,
  PatientIncludeLogBookDto,
  PatientIncludeRecordDto,
  PatientIncludeDoctorDto,
  PatientIncludeNotificationDto,
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

  findDoctor(id: number): Promise<PatientIncludeDoctorDto> {
    return this.patientRepository.findOne(id, {
      relations: ['doctor'],
    });
  }

  findNotifications(id: number): Promise<PatientIncludeNotificationDto> {
    return this.patientRepository.findOne(id, {
      relations: ['notifications'],
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
    try {
      const userHash = { ...patientData };
      userHash.password = bcrypt.hashSync(userHash.password, this.saltRounds);
      return this.patientRepository.save(userHash);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: error.code,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new InternalServerErrorException();
    }
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
