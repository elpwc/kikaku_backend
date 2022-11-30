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
import { YearRecordService } from './year-record.service';
import { CreateYearRecordDto } from './dto/create-year-record.dto';
import { UpdateYearRecordDto } from './dto/update-year-record.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { YearRecord } from './entities/year-record.entity';
import { ResponseDto } from 'src/dto/response.dto';
import { UserDec } from 'src/user/user.decorator';

@Controller('year-record')
@ApiTags('YearRecord')
export class YearRecordController {
  constructor(private readonly yearRecordService: YearRecordService) {}

  @ApiOperation({ summary: 'Create year record' })
  @ApiResponse({
    status: 201,
    description: 'suc',
    type: ResponseDto<YearRecord>,
  })
  @Post()
  async create(
    @UserDec('id') userId: number,
    @Body() createYearRecordDto: CreateYearRecordDto,
  ) {
    return this.yearRecordService.create(userId, createYearRecordDto);
  }

  @ApiOperation({ summary: 'get all' })
  @ApiResponse({
    status: 200,
    description: 'suc',
    type: ResponseDto<YearRecord[]>,
  })
  @Get()
  async findAll(@UserDec('id') userId: number, @Query() query) {
    return this.yearRecordService.findAllByUserId(userId, query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.yearRecordService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateYearRecordDto: UpdateYearRecordDto,
  ) {
    return this.yearRecordService.update(+id, updateYearRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.yearRecordService.remove(+id);
  }
}
