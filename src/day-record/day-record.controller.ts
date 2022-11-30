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
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from 'src/dto/response.dto';
import { UserDec } from 'src/user/user.decorator';
import { DayRecordService } from './day-record.service';
import { CreateDayRecordDto } from './dto/create-day-record.dto';
import { UpdateDayRecordDto } from './dto/update-day-record.dto';
import { DayRecord } from './entities/day-record.entity';

@Controller('day-record')
@ApiTags('DayRecord')
export class DayRecordController {
  constructor(private readonly dayRecordService: DayRecordService) {}

  @ApiOperation({ summary: 'Create day record' })
  @ApiResponse({
    status: 201,
    description: 'suc',
    type: ResponseDto<DayRecord>,
  })
  @Post()
  async create(
    @UserDec('id') userId: number,
    @Body() createDayRecordDto: CreateDayRecordDto,
  ) {
    return this.dayRecordService.create(userId, createDayRecordDto);
  }

  @ApiOperation({ summary: 'get all' })
  @ApiResponse({
    status: 200,
    description: 'suc',
    type: ResponseDto<DayRecord[]>,
  })
  @Get()
  async findAll(@UserDec('id') userId: number, @Query() query) {
    return this.dayRecordService.findAll(query, userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.dayRecordService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDayRecordDto: UpdateDayRecordDto,
  ) {
    return this.dayRecordService.update(+id, updateDayRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.dayRecordService.remove(+id);
  }
}
