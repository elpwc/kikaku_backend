import { ApiProperty } from '@nestjs/swagger';
import { WeekRecord } from 'src/week-record/entities/week-record.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class DayRecord extends WeekRecord {
  @Column()
  @ApiProperty()
  /** 0-6 */
  day: number;

  @Column()
  @ApiProperty()
  /** 0-6 */
  startTime: Date;

  @Column()
  @ApiProperty()
  /** 0-6 */
  endTime: Date;
}