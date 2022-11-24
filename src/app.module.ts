import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './dataSource';
import { AffairModule } from './affair/affair.module';
import { AffairTypeModule } from './affair-type/affair-type.module';
import { YearRecordModule } from './year-record/year-record.module';
import { MonthRecordModule } from './month-record/month-record.module';
import { WeekRecordModule } from './week-record/week-record.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    AffairModule,
    AffairTypeModule,
    YearRecordModule,
    MonthRecordModule,
    WeekRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
