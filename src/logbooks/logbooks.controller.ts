import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LogBooksService } from './logbooks.service';
import {
  CreateUpdateLogBookDto,
  CreateUpdateLogBookAuthDto,
} from './logbook.dto';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Logbooks')
@Controller('')
export class LogBooksController {
  constructor(private logBooksService: LogBooksService) {}

  @ApiResponse({ status: 200, type: CreateUpdateLogBookDto })
  @Get('/logbooks')
  async findAll(): Promise<CreateUpdateLogBookDto[]> {
    return this.logBooksService.findAll();
  }

  @ApiResponse({ status: 200, type: CreateUpdateLogBookDto })
  @Get('/logbooks/:id')
  async findOne(@Param('id') id: number): Promise<CreateUpdateLogBookDto> {
    return this.logBooksService.findOne(id);
  }

  @Post('/logbooks')
  async create(
    @Body() logBookData: CreateUpdateLogBookDto,
  ): Promise<CreateUpdateLogBookDto> {
    return this.logBooksService.create(logBookData);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('App Patient')
  @Post('/auth/logbooks')
  async createAuth(
    @Request() req,
    @Body() logBookData: CreateUpdateLogBookAuthDto,
  ): Promise<CreateUpdateLogBookDto> {
    logBookData.patientId = req.user.id;
    return this.logBooksService.create(logBookData);
  }

  @Put('/logbooks/:id')
  async update(
    @Param('id') id: number,
    @Body() logBookData: CreateUpdateLogBookDto,
  ): Promise<boolean> {
    return this.logBooksService.update(id, logBookData);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('App Patient')
  @Put('/auth/logbooks/:id')
  async updateAuth(
    @Request() req,
    @Param('id') id: number,
    @Body() logBookData: CreateUpdateLogBookAuthDto,
  ): Promise<boolean> {
    logBookData.patientId = req.user.id;
    await this.logBooksService.isOwner(id, req.user.id);
    return this.logBooksService.update(id, logBookData);
  }

  @Delete('/logbooks/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.logBooksService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('App Patient')
  @Delete('/auth/logbooks/:id')
  async removeAuth(@Request() req, @Param('id') id: number): Promise<boolean> {
    await this.logBooksService.isOwner(id, req.user.id);
    return this.logBooksService.remove(id);
  }
}
