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
import { AffairTypeService } from './affair-type.service';
import { CreateAffairTypeDto } from './dto/create-affair-type.dto';
import { UpdateAffairTypeDto } from './dto/update-affair-type.dto';

@Controller('affair-type')
export class AffairTypeController {
  constructor(private readonly affairTypeService: AffairTypeService) {}

  @ApiOperation({ summary: 'Create affair type' })
  @ApiResponse({
    status: 201,
    description: 'suc',
  })
  @Post()
  async create(@Body() createAffairTypeDto: CreateAffairTypeDto) {
    return this.affairTypeService.create(createAffairTypeDto);
  }

  @ApiOperation({ summary: 'get all' })
  @ApiResponse({ status: 200, description: 'suc' })
  @Get()
  async findAll(@Query() query) {
    return this.affairTypeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affairTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAffairTypeDto: UpdateAffairTypeDto,
  ) {
    return this.affairTypeService.update(+id, updateAffairTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affairTypeService.remove(+id);
  }
}
