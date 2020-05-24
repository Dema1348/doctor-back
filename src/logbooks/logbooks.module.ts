import { Module } from '@nestjs/common';
import { LogBooksController } from './logbooks.controller';
import { LogBooksService } from './logbooks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogBook } from './logbook.entity';
import { Patient } from 'src/patients/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LogBook, Patient])],
  providers: [LogBooksService],
  controllers: [LogBooksController],
})
export class LogBooksModule {}
