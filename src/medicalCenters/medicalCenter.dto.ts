import { ApiProperty } from '@nestjs/swagger';
import { CreateUpdateDoctorDto } from '../doctors/doctor.dto';

export class CreateUpdateMedicalCenterDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

export class MedicalCenterIncludeDoctorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: [CreateUpdateDoctorDto] })
  doctors: CreateUpdateDoctorDto[];
}
