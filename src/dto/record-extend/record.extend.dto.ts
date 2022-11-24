import { ApiProperty } from '@nestjs/swagger';

export class RecordExtendDto {
  @ApiProperty()
  year: number;

  @ApiProperty()
  affairId: number;
}
