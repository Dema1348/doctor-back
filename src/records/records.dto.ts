import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateRecordDto {
  @ApiProperty()
  threwUp: number;

  @ApiProperty()
  diarrhea: number;

  @ApiProperty()
  constipation: number;

  @ApiProperty()
  pain: number;

  @ApiProperty()
  fatigue: number;

  @ApiProperty()
  appetite: number;

  @ApiProperty()
  fever: number;

  @ApiProperty()
  cold: number;

  @ApiProperty()
  mucositis: number;

  @ApiProperty()
  sickness: number;

  @ApiProperty()
  catheter: number;

  @ApiProperty()
  dyspnoea: number;

  @ApiProperty()
  assignedDate: Date;

  @ApiProperty()
  patientId: number;
}

export class CreateUpdateRecordAuthDto {
  id: number;

  @ApiProperty()
  threwUp: number;

  @ApiProperty()
  diarrhea: number;

  @ApiProperty()
  constipation: number;

  @ApiProperty()
  pain: number;

  @ApiProperty()
  fatigue: number;

  @ApiProperty()
  appetite: number;

  @ApiProperty()
  fever: number;

  @ApiProperty()
  cold: number;

  @ApiProperty()
  mucositis: number;

  @ApiProperty()
  sickness: number;

  @ApiProperty()
  catheter: number;

  @ApiProperty()
  dyspnoea: number;

  @ApiProperty()
  assignedDate: Date;

  patientId: number;
}
