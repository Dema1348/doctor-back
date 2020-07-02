import { ApiProperty } from '@nestjs/swagger';
import { CreateUpdatePatientDto } from 'src/patients/patient.dto';
import { CreateUpdateNotificationDto } from 'src/notifications/notification.dto';

export class CreateUpdateDoctorDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  cellPhone: string;

  @ApiProperty()
  tokenFirebase: string;

  @ApiProperty()
  password: string;
}

export class PatientDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  cellPhone: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  run: string;

  @ApiProperty()
  stage: string;

  @ApiProperty()
  treatment: string;

  @ApiProperty()
  cellPhoneContact: string;

  @ApiProperty()
  nameContact: string;
}

export class DoctorIncludePatientDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  cellPhone: string;

  @ApiProperty()
  tokenFirebase: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ type: [PatientDto] })
  patients: PatientDto[];
}

export class DoctorIncludeNotificationDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  cellPhone: string;

  @ApiProperty()
  tokenFirebase: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ type: [CreateUpdateNotificationDto] })
  notifications: CreateUpdateNotificationDto[];
}

export class AssingDoctorDto {
  @ApiProperty()
  doctorId: number;
}
