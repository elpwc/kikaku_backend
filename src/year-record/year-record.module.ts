import { Module } from '@nestjs/common';
import { YearRecordService } from './year-record.service';
import { YearRecordController } from './year-record.controller';
import { YearRecord } from './entities/year-record.entity';
import { Affair } from 'src/affair/entities/affair.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([YearRecord, Affair])],
  controllers: [YearRecordController],
  providers: [YearRecordService],
})
export class YearRecordModule {}
