import { PartialType } from '@nestjs/swagger';
import { CreateDayRecordDto } from './create-day-record.dto';

export class UpdateDayRecordDto extends PartialType(CreateDayRecordDto) {}
