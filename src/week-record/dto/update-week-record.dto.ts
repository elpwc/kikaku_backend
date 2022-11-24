import { PartialType } from '@nestjs/swagger';
import { CreateWeekRecordDto } from './create-week-record.dto';

export class UpdateWeekRecordDto extends PartialType(CreateWeekRecordDto) {}
