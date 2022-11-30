import { ApiProperty } from '@nestjs/swagger';
import { Affair } from 'src/affair/entities/affair.entity';
import { RecordExtend } from 'src/dto/record-extend/record.extend.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@Entity()
export class YearRecord extends RecordExtend {
  @ManyToOne(() => Affair, (affair) => affair.yearRecord)
  @ApiProperty({ type: () => Affair })
  affair: Affair;

  @ManyToOne(() => User, (user) => user.yearRecords)
  @ApiProperty({ type: () => User })
  user: User;
}
