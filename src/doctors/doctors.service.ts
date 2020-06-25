import {
  Injectable,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Doctor } from './doctor.entity';
import * as bcrypt from 'bcrypt';
import {
  CreateUpdateDoctorDto,
  DoctorIncludePatientDto,
  DoctorIncludeNotificationDto,
} from './doctor.dto';

@Injectable()
export class DoctorsService {
  saltRounds = 10;

  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  findOne(id: number): Promise<CreateUpdateDoctorDto> {
    return this.doctorRepository.findOne(id);
  }

  findPatients(id: number): Promise<DoctorIncludePatientDto> {
    return this.doctorRepository.findOne(id, {
      relations: ['patients'],
    });
  }

  findNotifications(id: number): Promise<DoctorIncludeNotificationDto> {
    return this.doctorRepository.findOne(id, {
      relations: ['notifications'],
    });
  }

  findByEmail(email: string): Promise<CreateUpdateDoctorDto> {
    return this.doctorRepository.findOne({
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

  findAll(): Promise<CreateUpdateDoctorDto[]> {
    return this.doctorRepository.find();
  }

  async create(
    doctorData: CreateUpdateDoctorDto,
  ): Promise<CreateUpdateDoctorDto> {
    try {
      const userHash = { ...doctorData };
      userHash.password = bcrypt.hashSync(userHash.password, this.saltRounds);
      return this.doctorRepository.save(userHash);
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
    doctorData: CreateUpdateDoctorDto,
  ): Promise<boolean> {
    await this.doctorRepository.update(id, doctorData);
    return true;
  }

  async remove(id: number): Promise<boolean> {
    await this.doctorRepository.delete(id);
    return true;
  }
}
