import { ApiProperty } from '@nestjs/swagger';
import { AffairType } from 'src/affair-type/entities/affair-type.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
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

  @Column()
  @ApiProperty()
  deadline: Date;

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
