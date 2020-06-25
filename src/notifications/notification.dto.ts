import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateNotificationDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  read: boolean;

  @ApiProperty()
  patientId: number;

  @ApiProperty()
  doctorId: number;
}
