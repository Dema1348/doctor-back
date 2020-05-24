import { ApiProperty } from '@nestjs/swagger';
import { CreateUpdateLogBookDto } from 'src/logbooks/logbook.dto';
import { CreateUpdateRecordDto } from 'src/records/records.dto';

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
