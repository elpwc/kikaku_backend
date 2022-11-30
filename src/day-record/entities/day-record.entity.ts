import { ApiProperty } from '@nestjs/swagger';
import { Affair } from 'src/affair/entities/affair.entity';
import { User } from 'src/user/entities/user.entity';
import { WeekRecord } from 'src/week-record/entities/week-record.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class DayRecord extends WeekRecord {
  @Column()
  @ApiProperty()
  /** 0-6 */
  day: number;

  @Column()
  @ApiProperty()
  startTime: number;

  @Column()
  @ApiProperty()
  endTime: number;

  @ManyToOne(() => Affair, (affair) => affair.dayRecord)
  @ApiProperty({ type: () => Affair })
  affair: Affair;

  @ManyToOne(() => User, (user) => user.dayRecords)
  @ApiProperty({ type: () => User })
  user: User;
}
