import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './doctor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor])],
  providers: [DoctorsService],
  controllers: [DoctorController],
  exports: [DoctorsService],
})
export class DoctorModule {}
