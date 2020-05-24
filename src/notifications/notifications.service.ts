import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateUpdateNotificationDto } from './notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  findOne(id: number): Promise<CreateUpdateNotificationDto> {
    return this.notificationRepository.findOne(id);
  }

  findAll(): Promise<CreateUpdateNotificationDto[]> {
    return this.notificationRepository.find();
  }

  async create(
    notificationData: CreateUpdateNotificationDto,
  ): Promise<CreateUpdateNotificationDto> {
    return this.notificationRepository.save(notificationData);
  }

  async update(
    id: number,
    notificationData: CreateUpdateNotificationDto,
  ): Promise<boolean> {
    await this.notificationRepository.update(id, notificationData);
    return true;
  }

  async remove(id: number): Promise<boolean> {
    await this.notificationRepository.delete(id);
    return true;
  }

  async isOwner(id: number, patientId: number) {
    const notificationData = await this.notificationRepository.findOne(id);
    if (notificationData.patientId !== patientId) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
