import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Patient } from 'src/patients/patient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Patient])],
  providers: [NotificationsService],
  controllers: [NotificationsController],
})
export class NotificationsModule {}
