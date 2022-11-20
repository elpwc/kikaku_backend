import { ApiProperty } from '@nestjs/swagger';

export class CreateAffairTypeDto {
  @ApiProperty()
  name: number;
}
