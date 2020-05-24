import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateLogBookDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  assignedDate: Date;

  @ApiProperty()
  patientId: number;
}

export class CreateUpdateLogBookAuthDto {
  id: number;

  @ApiProperty()
  text: string;

  @ApiProperty()
  assignedDate: Date;

  patientId: number;
}
