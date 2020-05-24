import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateUpdateNotificationDto } from './notification.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Notifications')
@Controller('')
export class NotificationsController {
  constructor(private logBooksService: NotificationsService) {}

  @ApiResponse({ status: 200, type: CreateUpdateNotificationDto })
  @Get('/notifications')
  async findAll(): Promise<CreateUpdateNotificationDto[]> {
    return this.logBooksService.findAll();
  }

  @ApiResponse({ status: 200, type: CreateUpdateNotificationDto })
  @Get('/notifications/:id')
  async findOne(@Param('id') id: number): Promise<CreateUpdateNotificationDto> {
    return this.logBooksService.findOne(id);
  }

  @Post('/notifications')
  async create(
    @Body() logBookData: CreateUpdateNotificationDto,
  ): Promise<CreateUpdateNotificationDto> {
    return this.logBooksService.create(logBookData);
  }

  @Put('/notifications/:id')
  async update(
    @Param('id') id: number,
    @Body() logBookData: CreateUpdateNotificationDto,
  ): Promise<boolean> {
    return this.logBooksService.update(id, logBookData);
  }

  @Delete('/notifications/:id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.logBooksService.remove(id);
  }
}
