import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MedicalCentersService } from './medicalCenters.service';
import {
  CreateUpdateMedicalCenterDto,
  MedicalCenterIncludeDoctorDto,
} from './medicalCenter.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUpdateDoctorDto, AssingDoctorDto } from 'src/doctors/doctor.dto';

@ApiTags('MedicalCenter')
@Controller('medicalCenters')
export class MedicalCentersController {
  constructor(private medicalCentersService: MedicalCentersService) {}

  @Get()
  async findAll(): Promise<CreateUpdateMedicalCenterDto[]> {
    return this.medicalCentersService.findAll();
  }

  @Get('/:id')
  async findOne(
    @Param('id') id: number,
  ): Promise<CreateUpdateMedicalCenterDto> {
    return this.medicalCentersService.findOne(id);
  }

  @Post('/:id/assignDoctor')
  async assignDoctor(
    @Param('id') id: number,
    @Body() { doctorId }: AssingDoctorDto,
  ): Promise<boolean> {
    return this.medicalCentersService.assignDoctor(id, doctorId);
  }

  @Delete('/:id/assignDoctor')
  async deleteAssignDoctor(
    @Param('id') id: number,
    @Body() { doctorId }: AssingDoctorDto,
  ): Promise<boolean> {
    return this.medicalCentersService.deleteAssignDoctor(id, doctorId);
  }

  @Get('/:id/doctors')
  async findDoctors(
    @Param('id') id: number,
  ): Promise<MedicalCenterIncludeDoctorDto> {
    return this.medicalCentersService.findDoctors(id);
  }

  @Post()
  async create(
    @Body() medicalCenterData: CreateUpdateMedicalCenterDto,
  ): Promise<CreateUpdateMedicalCenterDto> {
    return this.medicalCentersService.create(medicalCenterData);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() medicalCenterData: CreateUpdateMedicalCenterDto,
  ): Promise<boolean> {
    return this.medicalCentersService.update(id, medicalCenterData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.medicalCentersService.remove(id);
  }
}
