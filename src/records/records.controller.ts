import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RecordsService } from './records.service';
import {
  CreateUpdateRecordDto,
  CreateUpdateRecordAuthDto,
} from './records.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Records')
@Controller('')
export class RecordsController {
  constructor(private recordsService: RecordsService) {}

  @ApiResponse({ status: 200, type: CreateUpdateRecordDto })
  @Get('/records')
  async findAll(): Promise<CreateUpdateRecordDto[]> {
    return this.recordsService.findAll();
  }

  @ApiResponse({ status: 200, type: CreateUpdateRecordDto })
  @Get('/records/patient/:patientId')
  async findLast(
    @Param('patientId') patientId: number,
  ): Promise<CreateUpdateRecordDto> {
    return this.recordsService.findLast(patientId);
  }

  @ApiResponse({ status: 200, type: CreateUpdateRecordDto })
  @Get('/records/:id')
  async findOne(@Param('id') id: number): Promise<CreateUpdateRecordDto> {
    return this.recordsService.findOne(id);
  }

  @Post('/records')
  async create(
    @Body() recordData: CreateUpdateRecordDto,
  ): Promise<CreateUpdateRecordDto> {
    return this.recordsService.create(recordData);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('App Patient')
  @Post('/auth/records')
  async createAuth(
    @Request() req,
    @Body() recordData: CreateUpdateRecordAuthDto,
  ): Promise<CreateUpdateRecordDto> {
    recordData.patientId = req.user.id;
    return this.recordsService.create(recordData);
  }

  @Put('/records/:id')
  async update(
    @Param('id') id: number,
    @Body() recordData: CreateUpdateRecordDto,
  ): Promise<boolean> {
    return this.recordsService.update(id, recordData);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('App Patient')
  @Put('/auth/records/:id')
  async updateAuth(
    @Request() req,
    @Param('id') id: number,
    @Body() recordData: CreateUpdateRecordDto,
  ): Promise<boolean> {
    recordData.patientId = req.user.id;
    await this.recordsService.isOwner(id, req.user.id);
    return this.recordsService.update(id, recordData);
  }

  @Delete('/records/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.recordsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('App Patient')
  @Delete('/auth/records/:id')
  async removeAuth(@Request() req, @Param('id') id: number): Promise<boolean> {
    await this.recordsService.isOwner(id, req.user.id);
    return this.recordsService.remove(id);
  }
}
