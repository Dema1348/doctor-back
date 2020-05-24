import { Injectable } from '@nestjs/common';
import { MedicalCenter } from './medicalCenter.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateUpdateMedicalCenterDto,
  MedicalCenterIncludeDoctorDto,
} from './medicalCenter.dto';
import { Doctor } from 'src/doctors/doctor.entity';
import { CreateUpdateDoctorDto, AssingDoctorDto } from 'src/doctors/doctor.dto';

@Injectable()
export class MedicalCentersService {
  constructor(
    @InjectRepository(MedicalCenter)
    private medicalCentersRepository: Repository<MedicalCenter>,
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
  ) {}

  findOne(id: number): Promise<CreateUpdateMedicalCenterDto> {
    return this.medicalCentersRepository.findOne(id);
  }

  findAll(): Promise<CreateUpdateMedicalCenterDto[]> {
    return this.medicalCentersRepository.find();
  }

  findDoctors(id: number): Promise<MedicalCenterIncludeDoctorDto> {
    return this.medicalCentersRepository.findOne(id, {
      relations: ['doctors'],
    });
  }

  async create(
    medicalCenterData: CreateUpdateMedicalCenterDto,
  ): Promise<CreateUpdateMedicalCenterDto> {
    return this.medicalCentersRepository.save(medicalCenterData);
  }

  async assignDoctor(id: number, doctorId: number): Promise<boolean> {
    const medicalCenterFind = await this.medicalCentersRepository.findOne(id, {
      relations: ['doctors'],
    });
    const doctorFind = await this.doctorsRepository.findOne(doctorId);
    medicalCenterFind.doctors = Array.isArray(medicalCenterFind.doctors)
      ? [...medicalCenterFind.doctors, doctorFind]
      : [doctorFind];
    await this.medicalCentersRepository.save(medicalCenterFind);
    return true;
  }

  async deleteAssignDoctor(id: number, doctorId: number): Promise<boolean> {
    const medicalCenterFind = await this.medicalCentersRepository.findOne(id, {
      relations: ['doctors'],
    });
    console.log(medicalCenterFind);
    medicalCenterFind.doctors = medicalCenterFind.doctors.filter(
      d => d.id !== doctorId,
    );
    console.log(medicalCenterFind);

    await this.medicalCentersRepository.save(medicalCenterFind);
    return true;
  }

  async update(
    id: number,
    medicalCenterData: CreateUpdateMedicalCenterDto,
  ): Promise<boolean> {
    await this.medicalCentersRepository.update(id, medicalCenterData);
    return true;
  }

  async remove(id: number): Promise<boolean> {
    await this.medicalCentersRepository.delete(id);
    return true;
  }
}
