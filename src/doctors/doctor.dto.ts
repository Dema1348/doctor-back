import { ApiProperty } from '@nestjs/swagger';
import { CreateUpdatePatientDto } from 'src/patients/patient.dto';

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
  password: string;
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
  password: string;

  @ApiProperty({ type: [CreateUpdatePatientDto] })
  patients: CreateUpdatePatientDto[];
}
