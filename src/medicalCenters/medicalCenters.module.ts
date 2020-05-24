import { Module } from '@nestjs/common';
import { MedicalCentersController } from './medicalCenters.controller';
import { MedicalCentersService } from './medicalCenters.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicalCenter } from './medicalCenter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalCenter])],
  controllers: [MedicalCentersController],
  providers: [MedicalCentersService],
})
export class MedicalCentersModule {}
