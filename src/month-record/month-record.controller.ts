import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MonthRecordService } from './month-record.service';
import { CreateMonthRecordDto } from './dto/create-month-record.dto';
import { UpdateMonthRecordDto } from './dto/update-month-record.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MonthRecord } from './entities/month-record.entity';
import { ResponseDto } from 'src/dto/response.dto';
import { UserDec } from 'src/user/user.decorator';

@Controller('month-record')
@ApiTags('MonthRecord')
export class MonthRecordController {
  constructor(private readonly monthRecordService: MonthRecordService) {}

  @ApiOperation({ summary: 'Create month record' })
  @ApiResponse({
    status: 201,
    description: 'suc',
    type: ResponseDto<MonthRecord>,
  })
  @Post()
  async create(
    @UserDec('id') userId: number,
    @Body() createMonthRecordDto: CreateMonthRecordDto,
  ) {
    return this.monthRecordService.create(userId, createMonthRecordDto);
  }

  @ApiOperation({ summary: 'get all' })
  @ApiResponse({
    status: 200,
    description: 'suc',
    type: ResponseDto<MonthRecord[]>,
  })
  @Get()
  async findAll(@UserDec('id') userId: number, @Query() query) {
    return this.monthRecordService.findAll(query, userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.monthRecordService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMonthRecordDto: UpdateMonthRecordDto,
  ) {
    return this.monthRecordService.update(+id, updateMonthRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.monthRecordService.remove(+id);
  }
}
