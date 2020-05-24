import { ApiProperty } from '@nestjs/swagger';

export class CreateUpdateNotificationDto {
  @ApiProperty()
  info: string;

  @ApiProperty()
  read: boolean;

  @ApiProperty()
  patientId: number;
}
