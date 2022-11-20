import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAffairTypeDto } from './create-affair-type.dto';

export class UpdateAffairTypeDto extends PartialType(CreateAffairTypeDto) {
  @ApiProperty()
  name: number;
}
