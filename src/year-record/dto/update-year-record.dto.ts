import { PartialType } from '@nestjs/swagger';
import { CreateYearRecordDto } from './create-year-record.dto';

export class UpdateYearRecordDto extends PartialType(CreateYearRecordDto) {}
