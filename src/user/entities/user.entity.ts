import { ApiProperty } from '@nestjs/swagger';
import { AffairType } from 'src/affair-type/entities/affair-type.entity';
import { Affair } from 'src/affair/entities/affair.entity';
import { DayRecord } from 'src/day-record/entities/day-record.entity';
import { MonthRecord } from 'src/month-record/entities/month-record.entity';
import { WeekRecord } from 'src/week-record/entities/week-record.entity';
import { YearRecord } from 'src/year-record/entities/year-record.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as argon2 from 'argon2';
import { IsEmail } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  @OneToMany(() => Affair, (type) => type.user)
  @JoinColumn()
  @ApiProperty()
  affairs: Affair[];

  @OneToMany(() => Affair, (type) => type.user)
  @JoinColumn()
  @ApiProperty()
  affairTypes: AffairType[];

  @OneToMany(() => YearRecord, (type) => type.user)
  @JoinColumn()
  @ApiProperty()
  yearRecord: YearRecord[];

  @OneToMany(() => MonthRecord, (type) => type.user)
  @JoinColumn()
  @ApiProperty()
  monthRecord: MonthRecord[];

  @OneToMany(() => WeekRecord, (type) => type.user)
  @JoinColumn()
  @ApiProperty()
  weekRecord: WeekRecord[];

  @OneToMany(() => DayRecord, (type) => type.user)
  @JoinColumn()
  @ApiProperty()
  dayRecord: DayRecord[];

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
