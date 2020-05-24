import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  providers: [PatientsService],
  controllers: [PatientController],
  exports: [PatientsService],
})
export class PatientsModule {}
