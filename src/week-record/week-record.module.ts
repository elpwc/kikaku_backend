import { Module } from '@nestjs/common';
import { WeekRecordService } from './week-record.service';
import { WeekRecordController } from './week-record.controller';
import { WeekRecord } from './entities/week-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affair } from 'src/affair/entities/affair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeekRecord, Affair])],
  controllers: [WeekRecordController],
  providers: [WeekRecordService],
})
export class WeekRecordModule {}
