import { ApiProperty } from '@nestjs/swagger';
import { Affair } from 'src/affair/entities/affair.entity';
import { RecordExtend } from 'src/dto/record-extend/record.extend.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class MonthRecord extends RecordExtend {
  @Column()
  @ApiProperty()
  month: number;

  @ManyToOne(() => Affair, (affair) => affair.monthRecord)
  @ApiProperty({ type: () => Affair })
  affair: Affair;

  @ManyToOne(() => User, (user) => user.monthRecords)
  @ApiProperty({ type: () => User })
  user: User;
}
