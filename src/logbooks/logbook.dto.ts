import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateLogBookDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  assignedDate: Date;

  @ApiProperty()
  patientId: number;
}
