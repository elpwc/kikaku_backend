import { Module } from '@nestjs/common';
import { MonthRecordService } from './month-record.service';
import { MonthRecordController } from './month-record.controller';
import { Affair } from 'src/affair/entities/affair.entity';
import { MonthRecord } from './entities/month-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MonthRecord, Affair])],
  controllers: [MonthRecordController],
  providers: [MonthRecordService],
})
export class MonthRecordModule {}
