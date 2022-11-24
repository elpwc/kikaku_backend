import { ApiProperty } from '@nestjs/swagger';
import { Affair } from 'src/affair/entities/affair.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class RecordExtend {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  year: number;

  @ManyToOne(() => Affair, (affair) => affair.yearRecord)
  @ApiProperty({ type: () => Affair })
  affair: Affair;

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
