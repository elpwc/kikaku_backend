import { ApiProperty } from '@nestjs/swagger';
import { RecordExtendDto } from 'src/dto/record-extend/record.extend.dto';

export class CreateMonthRecordDto extends RecordExtendDto {
  @ApiProperty()
  month: number;
}
