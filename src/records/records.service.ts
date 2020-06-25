import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Record } from './record.entity';
import { CreateUpdateRecordDto } from './records.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { CreateUpdateNotificationDto } from 'src/notifications/notification.dto';

@Injectable()
export class RecordsService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
    private notificationsService: NotificationsService,
  ) {}

  findOne(id: number): Promise<CreateUpdateRecordDto> {
    return this.recordRepository.findOne(id);
  }

  findAll(): Promise<CreateUpdateRecordDto[]> {
    return this.recordRepository.find();
  }

  async findLast(patientId): Promise<CreateUpdateRecordDto> {
    const [last] = await this.recordRepository.find({
      where: { patientId },
      order: { assignedDate: 'DESC' },
      take: 1,
    });
    return last;
  }

  async create(
    recordData: CreateUpdateRecordDto,
  ): Promise<CreateUpdateRecordDto> {
    this.notificationsService.createPush(recordData);
    return this.recordRepository.save(recordData);
  }

  async update(
    id: number,
    recordData: CreateUpdateRecordDto,
  ): Promise<boolean> {
    await this.recordRepository.update(id, recordData);
    return true;
  }

  async remove(id: number): Promise<boolean> {
    await this.recordRepository.delete(id);
    return true;
  }

  async isOwner(id: number, patientId: number) {
    const recordData = await this.recordRepository.findOne(id);
    if (recordData.patientId !== patientId) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
