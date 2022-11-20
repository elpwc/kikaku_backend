import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

export class ResponseDto<T> {
  @ApiProperty()
  data: T;

  @ApiProperty()
  code: HttpStatus;

  @ApiProperty()
  msg: string;
}
