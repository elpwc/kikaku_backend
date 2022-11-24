import { ApiProperty } from '@nestjs/swagger';
import { MonthRecord } from 'src/month-record/entities/month-record.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class WeekRecord extends MonthRecord {
  @Column()
  @ApiProperty()
  week: number;
}
