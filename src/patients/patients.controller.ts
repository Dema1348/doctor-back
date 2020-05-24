import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import {
  CreateUpdatePatientDto,
  PatientIncludeLogBookDto,
  PatientIncludeRecordDto,
} from './patient.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Patients')
@Controller('patients')
export class PatientController {
  constructor(private patientsService: PatientsService) {}

  @ApiResponse({ status: 200, type: CreateUpdatePatientDto })
  @Get()
  async findAll(): Promise<CreateUpdatePatientDto[]> {
    return this.patientsService.findAll();
  }

  @ApiResponse({ status: 200, type: CreateUpdatePatientDto })
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<CreateUpdatePatientDto> {
    return this.patientsService.findOne(id);
  }

  @ApiResponse({ status: 200, type: PatientIncludeLogBookDto })
  @Get('/:id/logbooks')
  async findLogbooks(
    @Param('id') id: number,
  ): Promise<PatientIncludeLogBookDto> {
    return this.patientsService.findLogbooks(id);
  }

  @ApiResponse({ status: 200, type: PatientIncludeRecordDto })
  @Get('/:id/records')
  async findRecords(@Param('id') id: number): Promise<PatientIncludeRecordDto> {
    return this.patientsService.findRecords(id);
  }

  @Post()
  async create(
    @Body() userData: CreateUpdatePatientDto,
  ): Promise<CreateUpdatePatientDto> {
    return this.patientsService.create(userData);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() userData: CreateUpdatePatientDto,
  ): Promise<boolean> {
    return this.patientsService.update(id, userData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.patientsService.remove(id);
  }
}
