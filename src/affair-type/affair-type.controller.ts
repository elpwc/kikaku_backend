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
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/dto/response.dto';
import { UserDec } from 'src/user/user.decorator';
import { AffairTypeService } from './affair-type.service';
import { CreateAffairTypeDto } from './dto/create-affair-type.dto';
import { UpdateAffairTypeDto } from './dto/update-affair-type.dto';
import { AffairType } from './entities/affair-type.entity';

@Controller('affair-type')
@ApiExtraModels(ResponseDto)
@ApiTags('AffairType')
export class AffairTypeController {
  constructor(private readonly affairTypeService: AffairTypeService) {}

  @ApiOperation({ summary: 'Create affair type' })
  @ApiResponse({
    status: 201,
    description: 'suc',
    type: ResponseDto<AffairType>,
  })
  @Post()
  async create(
    @UserDec('id') userId: number,
    @Body() createAffairTypeDto: CreateAffairTypeDto,
  ) {
    return this.affairTypeService.create(userId, createAffairTypeDto);
  }

  @ApiOperation({ summary: 'get all' })
  @ApiResponse({
    status: 200,
    description: 'suc',
    type: ResponseDto<AffairType[]>,
  })
  @Get()
  async findAll(@UserDec('id') userId: number, @Query() query) {
    return this.affairTypeService.findAllByUserId(userId, query);
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
