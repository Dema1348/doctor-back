import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import { CreateUpdateRecordDto } from './records.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @ApiResponse({ status: 200, type: CreateUpdateRecordDto })
  @Get()
  async findAll(): Promise<CreateUpdateRecordDto[]> {
    return this.recordsService.findAll();
  }

  @ApiResponse({ status: 200, type: CreateUpdateRecordDto })
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<CreateUpdateRecordDto> {
    return this.recordsService.findOne(id);
  }

  @Post()
  async create(
    @Body() userData: CreateUpdateRecordDto,
  ): Promise<CreateUpdateRecordDto> {
    return this.recordsService.create(userData);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() userData: CreateUpdateRecordDto,
  ): Promise<boolean> {
    return this.recordsService.update(id, userData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.recordsService.remove(id);
  }
}
