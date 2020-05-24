import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateUpdateDoctorDto, DoctorIncludePatientDto } from './doctor.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Doctors')
@Controller('doctors')
export class DoctorController {
  constructor(private doctorsService: DoctorsService) {}

  @ApiResponse({ status: 200, type: CreateUpdateDoctorDto })
  @Get()
  async findAll(): Promise<CreateUpdateDoctorDto[]> {
    return this.doctorsService.findAll();
  }

  @ApiResponse({ status: 200, type: CreateUpdateDoctorDto })
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<CreateUpdateDoctorDto> {
    return this.doctorsService.findOne(id);
  }

  @ApiResponse({ status: 200, type: DoctorIncludePatientDto })
  @Get('/:id/patient')
  async findPatient(@Param('id') id: number): Promise<DoctorIncludePatientDto> {
    return this.doctorsService.findPatients(id);
  }

  @Post()
  async create(
    @Body() userData: CreateUpdateDoctorDto,
  ): Promise<CreateUpdateDoctorDto> {
    return this.doctorsService.create(userData);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() userData: CreateUpdateDoctorDto,
  ): Promise<boolean> {
    return this.doctorsService.update(id, userData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.doctorsService.remove(id);
  }
}
