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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  ApiExtraModels,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/dto/response.dto';

@Controller('user')
@ApiExtraModels(ResponseDto)
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'suc',
    type: ResponseDto<User>,
  })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'get all' })
  @ApiResponse({ status: 200, description: 'suc', type: ResponseDto<User[]> })
  @Get()
  async findAll(@Query() query) {
    return this.userService.findAll(query);
  }

  @ApiOperation({ summary: 'get one by id' })
  @ApiResponse({ status: 200, description: 'suc', type: ResponseDto<User> })
  @ApiResponse({ status: 404, description: 'not find', type: ResponseDto })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
