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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AffairService } from './affair.service';
import { CreateAffairDto } from './dto/create-affair.dto';
import { UpdateAffairDto } from './dto/update-affair.dto';

@Controller('affair')
export class AffairController {
  constructor(private readonly affairService: AffairService) {}

  @ApiOperation({ summary: 'Create affair' })
  @ApiResponse({
    status: 201,
    description: 'suc',
  })
  @Post()
  async create(@Body() createAffairDto: CreateAffairDto) {
    return this.affairService.create(createAffairDto);
  }

  @ApiOperation({ summary: 'get all' })
  @ApiResponse({ status: 200, description: 'suc' })
  @Get()
  async findAll(@Query() query) {
    return this.affairService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affairService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAffairDto: UpdateAffairDto) {
    return this.affairService.update(+id, updateAffairDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affairService.remove(+id);
  }
}
