import { ApiProperty } from '@nestjs/swagger';
import { AffairType } from 'src/affair-type/entities/affair-type.entity';
import { DayRecord } from 'src/day-record/entities/day-record.entity';
import { MonthRecord } from 'src/month-record/entities/month-record.entity';
import { User } from 'src/user/entities/user.entity';
import { WeekRecord } from 'src/week-record/entities/week-record.entity';
import { YearRecord } from 'src/year-record/entities/year-record.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Affair {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @ManyToOne(() => AffairType, (type) => type.affairs)
  @ApiProperty({ type: () => AffairType })
  type: AffairType;

  @Column()
  @ApiProperty()
  content: string;

  @Column({ nullable: true })
  @ApiProperty({ nullable: true })
  deadline?: Date | null;

  @Column()
  @ApiProperty()
  continuePeriod_min: number;

  @Column()
  @ApiProperty()
  times: number;

  @Column()
  @ApiProperty()
  isImportant: boolean;

  @Column()
  @ApiProperty()
  doAlarm: boolean;

  @OneToMany(() => YearRecord, (year) => year.affair)
  @JoinColumn()
  @ApiProperty()
  yearRecord: YearRecord[];

  @OneToMany(() => MonthRecord, (month) => month.affair)
  @JoinColumn()
  @ApiProperty()
  monthRecord: MonthRecord[];

  @OneToMany(() => WeekRecord, (week) => week.affair)
  @JoinColumn()
  @ApiProperty()
  weekRecord: WeekRecord[];

  @OneToMany(() => DayRecord, (day) => day.affair)
  @JoinColumn()
  @ApiProperty()
  dayRecord: DayRecord[];

  @ManyToOne(() => User, (user) => user.affairs)
  @ApiProperty({ type: () => User })
  user: User;

  @Column({ nullable: true })
  @ApiProperty({ nullable: true })
  deleted: boolean;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  createtime: Date;

  @Column('datetime', { default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  updatetime: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatetime = new Date();
  }
}
