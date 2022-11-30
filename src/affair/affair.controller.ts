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
import { AffairService } from './affair.service';
import { CreateAffairDto } from './dto/create-affair.dto';
import { UpdateAffairDto } from './dto/update-affair.dto';
import { Affair } from './entities/affair.entity';

@Controller('affair')
@ApiExtraModels(ResponseDto)
@ApiTags('Affair')
export class AffairController {
  constructor(private readonly affairService: AffairService) {}

  @ApiOperation({ summary: 'Create affair' })
  @ApiResponse({
    status: 201,
    description: 'suc',
    type: ResponseDto<Affair>,
  })
  @Post()
  async create(
    @UserDec('id') userId: number,
    @Body() createAffairDto: CreateAffairDto,
  ) {
    return this.affairService.create(userId, createAffairDto);
  }

  @ApiOperation({ summary: 'get all' })
  @ApiResponse({ status: 200, description: 'suc', type: ResponseDto<Affair[]> })
  @Get()
  async findAll(@UserDec('id') userId: number, @Query() query) {
    return this.affairService.findAllByUserId(userId, query);
  }

  @ApiOperation({ summary: 'get one by id' })
  @ApiResponse({ status: 200, description: 'suc', type: ResponseDto<Affair> })
  @ApiResponse({ status: 404, description: 'not find', type: ResponseDto })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.affairService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAffairDto: UpdateAffairDto,
  ) {
    return this.affairService.update(+id, updateAffairDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.affairService.remove(+id);
  }
}
