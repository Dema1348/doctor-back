import { ApiProperty } from '@nestjs/swagger';

export class MedicalCenterDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}

export class ListMedicalCenterDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
