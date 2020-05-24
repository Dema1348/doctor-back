import { ApiProperty } from '@nestjs/swagger';
import { CreateUpdateLogBookDto } from 'src/logbooks/logbook.dto';
import { CreateUpdateRecordDto } from 'src/records/records.dto';
import { CreateUpdateDoctorDto } from 'src/doctors/doctor.dto';
import { CreateUpdateNotificationDto } from 'src/notifications/notification.dto';

export class CreateUpdatePatientDto {
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
  doctorId: number;
}

export class CreateUpdatePatientAuthDto {
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

  doctorId: number;
}

export class PatientIncludeLogBookDto {
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

  @ApiProperty({ type: [CreateUpdateLogBookDto] })
  logBooks: CreateUpdateLogBookDto[];
}

export class PatientIncludeDoctorDto {
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

  @ApiProperty({ type: CreateUpdateDoctorDto })
  doctor: CreateUpdateDoctorDto;
}

export class PatientIncludeRecordDto {
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

  @ApiProperty({ type: [CreateUpdateRecordDto] })
  records: CreateUpdateRecordDto[];
}

export class PatientIncludeNotificationDto {
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

  @ApiProperty({ type: [CreateUpdateNotificationDto] })
  notifications: CreateUpdateNotificationDto[];
}
