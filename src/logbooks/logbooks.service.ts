import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LogBook } from './logbook.entity';
import { CreateUpdateLogBookDto } from './logbook.dto';

@Injectable()
export class LogBooksService {
  constructor(
    @InjectRepository(LogBook)
    private logBookRepository: Repository<LogBook>,
  ) {}

  findOne(id: number): Promise<CreateUpdateLogBookDto> {
    return this.logBookRepository.findOne(id);
  }

  findAll(): Promise<CreateUpdateLogBookDto[]> {
    return this.logBookRepository.find();
  }

  async create(
    logbookData: CreateUpdateLogBookDto,
  ): Promise<CreateUpdateLogBookDto> {
    return this.logBookRepository.save(logbookData);
  }

  async update(
    id: number,
    logbookData: CreateUpdateLogBookDto,
  ): Promise<boolean> {
    await this.logBookRepository.update(id, logbookData);
    return true;
  }

  async remove(id: number): Promise<boolean> {
    await this.logBookRepository.delete(id);
    return true;
  }

  async isOwner(id: number, patientId: number) {
    const logbookData = await this.logBookRepository.findOne(id);
    if (logbookData.patientId !== patientId) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
