import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class RegisterDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  token: string;
}
