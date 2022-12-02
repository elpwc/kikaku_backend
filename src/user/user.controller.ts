import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  ForbiddenException,
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
import { LoginDto } from './dto/login.dto';
import { UserDec } from './user.decorator';
import { verifyRecaptcha } from 'src/utils/verifyRecaptcha';
import { RegisterDto } from './dto/register';

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
  async create(@Body() registerDto: RegisterDto) {
    const recaptchaVerifiedRes = await verifyRecaptcha(registerDto.token);
    if (recaptchaVerifiedRes) {
      return this.userService.create(registerDto);
    } else {
      throw new ForbiddenException('reCAPTCHA not solved');
    }
  }

  @Post('/login')
  async login(@Body() loginParams: LoginDto) {
    const _user = await this.userService.findOne(loginParams);

    const errors = { User: ' not found' };
    if (!_user) throw new HttpException({ errors }, 401);

    const token = await this.userService.generateJWT(_user);
    const { name } = _user;
    const user = { name, token };
    return { user };
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
  @Get(':name')
  async findByName(@Param('name') name: string) {
    return this.userService.findByName(name);
  }

  @Patch(':id')
  async update(
    @UserDec('id') id: string,
    @Param('id') id_not_used: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
