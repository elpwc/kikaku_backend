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
  async create(@Body() createMonthRecordDto: CreateMonthRecordDto) {
    return this.monthRecordService.create(createMonthRecordDto);
  }

  @ApiOperation({ summary: 'get all' })
  @ApiResponse({
    status: 200,
    description: 'suc',
    type: ResponseDto<MonthRecord[]>,
  })
  @Get()
  async findAll(@Query() query) {
    return this.monthRecordService.findAll(query);
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
