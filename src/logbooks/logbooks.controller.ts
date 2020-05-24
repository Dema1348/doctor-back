import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { LogBooksService } from './logbooks.service';
import { CreateUpdateLogBookDto } from './logbook.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Logbooks')
@Controller('logbooks')
export class LogBooksController {
  constructor(private logBooksService: LogBooksService) {}

  @ApiResponse({ status: 200, type: CreateUpdateLogBookDto })
  @Get()
  async findAll(): Promise<CreateUpdateLogBookDto[]> {
    return this.logBooksService.findAll();
  }

  @ApiResponse({ status: 200, type: CreateUpdateLogBookDto })
  @Get('/:id')
  async findOne(@Param('id') id: number): Promise<CreateUpdateLogBookDto> {
    return this.logBooksService.findOne(id);
  }

  @Post()
  async create(
    @Body() userData: CreateUpdateLogBookDto,
  ): Promise<CreateUpdateLogBookDto> {
    return this.logBooksService.create(userData);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() userData: CreateUpdateLogBookDto,
  ): Promise<boolean> {
    return this.logBooksService.update(id, userData);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.logBooksService.remove(id);
  }
}
