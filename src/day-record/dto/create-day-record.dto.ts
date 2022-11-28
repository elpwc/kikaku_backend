import { ApiProperty } from '@nestjs/swagger';
import { CreateWeekRecordDto } from 'src/week-record/dto/create-week-record.dto';

export class CreateDayRecordDto extends CreateWeekRecordDto {
  @ApiProperty()
  /** 0-6 */
  day: number;

  @ApiProperty()
  startTime: number;

  @ApiProperty()
  endTime: number;
}
