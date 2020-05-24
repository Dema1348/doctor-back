import { Injectable } from '@nestjs/common';
import { MedicalCenter } from './medicalCenter.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MedicalCentersService {
  constructor(
    @InjectRepository(MedicalCenter)
    private medicalCentersRepository: Repository<MedicalCenter>,
  ) {}

  findOne(id: number): Promise<any> {
    return this.medicalCentersRepository.findOne(id);
  }

  findAll(): Promise<any[]> {
    return this.medicalCentersRepository.find();
  }

  async create(medicalCenter: any): Promise<any> {
    return this.medicalCentersRepository.save(medicalCenter);
  }

  async update(id: number, userData: any): Promise<boolean> {
    await this.medicalCentersRepository.update(id, userData);
    return true;
  }

  async remove(id: number): Promise<boolean> {
    await this.medicalCentersRepository.delete(id);
    return true;
  }
}
