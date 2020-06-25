import { Module } from '@nestjs/common';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './record.entity';
import { Patient } from 'src/patients/patient.entity';
import { Notification } from 'src/notifications/notification.entity';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  imports: [TypeOrmModule.forFeature([Record, Patient, Notification])],
  providers: [RecordsService, NotificationsService],
  controllers: [RecordsController],
})
export class RecordsModule {}
