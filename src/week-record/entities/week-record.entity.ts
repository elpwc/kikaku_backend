import { ApiProperty } from '@nestjs/swagger';
import { Affair } from 'src/affair/entities/affair.entity';
import { MonthRecord } from 'src/month-record/entities/month-record.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class WeekRecord extends MonthRecord {
  @Column()
  @ApiProperty()
  week: number;

  @ManyToOne(() => Affair, (affair) => affair.weekRecord)
  @ApiProperty({ type: () => Affair })
  affair: Affair;

  @ManyToOne(() => User, (user) => user.weekRecord)
  @ApiProperty({ type: () => User })
  user: User;
}
