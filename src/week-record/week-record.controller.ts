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
import { WeekRecordService } from './week-record.service';
import { CreateWeekRecordDto } from './dto/create-week-record.dto';
import { UpdateWeekRecordDto } from './dto/update-week-record.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WeekRecord } from './entities/week-record.entity';
import { ResponseDto } from 'src/dto/response.dto';

@Controller('week-record')
@ApiTags('WeekRecord')
export class WeekRecordController {
  constructor(private readonly weekRecordService: WeekRecordService) {}

  @ApiOperation({ summary: 'Create week record' })
  @ApiResponse({
    status: 201,
    description: 'suc',
    type: ResponseDto<WeekRecord>,
  })
  @Post()
  async create(@Body() createWeekRecordDto: CreateWeekRecordDto) {
    return this.weekRecordService.create(createWeekRecordDto);
  }

  @ApiOperation({ summary: 'get all' })
  @ApiResponse({
    status: 200,
    description: 'suc',
    type: ResponseDto<WeekRecord[]>,
  })
  @Get()
  async findAll(@Query() query) {
    return this.weekRecordService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.weekRecordService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWeekRecordDto: UpdateWeekRecordDto,
  ) {
    return this.weekRecordService.update(+id, updateWeekRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.weekRecordService.remove(+id);
  }
}
