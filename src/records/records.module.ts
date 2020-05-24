import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { Patient } from 'src/patients/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record, Patient])],
  providers: [RecordsService],
  controllers: [RecordsController],
})
export class RecordsModule {}
