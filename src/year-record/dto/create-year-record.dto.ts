import { ApiProperty } from '@nestjs/swagger';

export class CreateYearRecordDto {
  @ApiProperty()
  year: number;

  @ApiProperty()
  affairId: number;
}
