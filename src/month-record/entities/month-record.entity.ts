import { ApiProperty } from '@nestjs/swagger';
import { RecordExtend } from 'src/dto/record-extend/record.extend.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class MonthRecord extends RecordExtend {
  @Column()
  @ApiProperty()
  month: number;
}
