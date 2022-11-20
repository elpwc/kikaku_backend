import { ApiProperty } from '@nestjs/swagger';
import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Affair {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  type: string;

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
