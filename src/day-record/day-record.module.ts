import { Module } from '@nestjs/common';
import { DayRecordService } from './day-record.service';
import { DayRecordController } from './day-record.controller';
import { DayRecord } from './entities/day-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affair } from 'src/affair/entities/affair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DayRecord, Affair])],
  controllers: [DayRecordController],
  providers: [DayRecordService],
})
export class DayRecordModule {}
