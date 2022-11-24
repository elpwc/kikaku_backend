import { ApiProperty } from '@nestjs/swagger';
import { CreateMonthRecordDto } from 'src/month-record/dto/create-month-record.dto';

export class CreateWeekRecordDto extends CreateMonthRecordDto {
  @ApiProperty()
  week: number;
}
