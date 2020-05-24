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
import { PatientsService } from './patients.service';
import {
  CreateUpdatePatientDto,
  PatientIncludeLogBookDto,
  PatientIncludeRecordDto,
  PatientIncludeDoctorDto,
  CreateUpdatePatientAuthDto,
  PatientIncludeNotificationDto,
} from './patient.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Patients')
@Controller('')
export class PatientController {
  constructor(private patientsService: PatientsService) {}

  @ApiResponse({ status: 200, type: CreateUpdatePatientDto })
  @Get('/patients')
  async findAll(): Promise<CreateUpdatePatientDto[]> {
    return this.patientsService.findAll();
  }

  @ApiResponse({ status: 200, type: CreateUpdatePatientDto })
  @Get('/patients/:id')
  async findOne(@Param('id') id: number): Promise<CreateUpdatePatientDto> {
    return this.patientsService.findOne(id);
  }

  @ApiResponse({ status: 200, type: PatientIncludeLogBookDto })
  @Get('/patients/:id/logbooks')
  async findLogbooks(
    @Param('id') id: number,
  ): Promise<PatientIncludeLogBookDto> {
    return this.patientsService.findLogbooks(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PatientIncludeLogBookDto })
  @ApiTags('App Patient')
  @Get('/auth/patients/logbooks')
  async findLogbooksAuth(@Request() req): Promise<PatientIncludeLogBookDto> {
    return this.patientsService.findLogbooks(req.user.id);
  }

  @ApiResponse({ status: 200, type: PatientIncludeRecordDto })
  @Get('/patients/:id/records')
  async findRecords(@Param('id') id: number): Promise<PatientIncludeRecordDto> {
    return this.patientsService.findRecords(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PatientIncludeRecordDto })
  @ApiTags('App Patient')
  @Get('/auth/patients/records')
  async findRecordsAuth(@Request() req): Promise<PatientIncludeRecordDto> {
    return this.patientsService.findRecords(req.user.id);
  }

  @ApiResponse({ status: 200, type: PatientIncludeDoctorDto })
  @Get('/patients/:id/doctor')
  async findDoctor(@Param('id') id: number): Promise<PatientIncludeDoctorDto> {
    return this.patientsService.findDoctor(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PatientIncludeDoctorDto })
  @ApiTags('App Patient')
  @Get('/auth/patients/doctor')
  async findDoctorAuth(@Request() req): Promise<PatientIncludeDoctorDto> {
    return this.patientsService.findDoctor(req.user.id);
  }

  @ApiResponse({ status: 200, type: PatientIncludeNotificationDto })
  @Get('/patients/:id/notifications')
  async findNotifications(
    @Param('id') id: number,
  ): Promise<PatientIncludeNotificationDto> {
    return this.patientsService.findNotifications(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PatientIncludeNotificationDto })
  @ApiTags('App Patient')
  @Get('/auth/patients/notifications')
  async findNotificationsAuth(
    @Request() req,
  ): Promise<PatientIncludeNotificationDto> {
    return this.patientsService.findNotifications(req.user.id);
  }

  @Post('/patients')
  async create(
    @Body() patientData: CreateUpdatePatientDto,
  ): Promise<CreateUpdatePatientDto> {
    return this.patientsService.create(patientData);
  }

  @Post('/auth/patients')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('App Doctor')
  async createAuth(
    @Request() req,
    @Body() patientData: CreateUpdatePatientAuthDto,
  ): Promise<CreateUpdatePatientAuthDto> {
    patientData.doctorId = req.user.id;
    return this.patientsService.create(patientData);
  }

  @Put('/patients/:id')
  async update(
    @Param('id') id: number,
    @Body() patientData: CreateUpdatePatientDto,
  ): Promise<boolean> {
    return this.patientsService.update(id, patientData);
  }

  @Delete('/patients/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.patientsService.remove(id);
  }
}
