import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MedicalCentersService } from './medicalCenters.service';
import { MedicalCenterDto } from './medicalCenter.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('MedicalCenter')
@Controller('medicalCenters')
export class MedicalCentersController {
  constructor(private medicalCentersService: MedicalCentersService) {}

  @Get()
  async findAll(): Promise<MedicalCenterDto[]> {
    return this.medicalCentersService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<MedicalCenterDto> {
    return this.medicalCentersService.findOne(id);
  }

  @Post()
  async create(@Body() userData: MedicalCenterDto): Promise<MedicalCenterDto> {
    return this.medicalCentersService.create(userData);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() userData: MedicalCenterDto,
  ): Promise<boolean> {
    return this.medicalCentersService.update(id, userData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.medicalCentersService.remove(id);
  }
}
