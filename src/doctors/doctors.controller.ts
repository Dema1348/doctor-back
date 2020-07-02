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
import { DoctorsService } from './doctors.service';
import {
  CreateUpdateDoctorDto,
  DoctorIncludePatientDto,
  DoctorIncludeNotificationDto,
} from './doctor.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: DoctorIncludePatientDto })
  @ApiTags('App Doctor')
  @Get('/auth/doctor/patient')
  async findPatient(@Request() req): Promise<DoctorIncludePatientDto> {
    return this.doctorsService.findPatients(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: DoctorIncludeNotificationDto })
  @ApiTags('App Doctor')
  @Get('/auth/doctor/notifications')
  async findNotificationsAuth(
    @Request() req,
  ): Promise<DoctorIncludeNotificationDto> {
    return this.doctorsService.findNotifications(req.user.id);
  }

  @Post()
  async create(
    @Body() doctorData: CreateUpdateDoctorDto,
  ): Promise<CreateUpdateDoctorDto> {
    return this.doctorsService.create(doctorData);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() doctorData: CreateUpdateDoctorDto,
  ): Promise<boolean> {
    return this.doctorsService.update(id, doctorData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.doctorsService.remove(id);
  }
}
