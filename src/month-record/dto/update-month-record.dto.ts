import { PartialType } from '@nestjs/swagger';
import { CreateMonthRecordDto } from './create-month-record.dto';

export class UpdateMonthRecordDto extends PartialType(CreateMonthRecordDto) {}
