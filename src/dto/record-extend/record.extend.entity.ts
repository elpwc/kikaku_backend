import { ApiProperty } from '@nestjs/swagger';
import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RecordExtend {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  year: number;

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
