import { ApiProperty } from '@nestjs/swagger';

export class CreateAffairDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  typeId: number;
  /** 说明 */
  @ApiProperty()
  content: string;

  /** 死线 */
  @ApiProperty()
  deadline?: Date;
  /** 一次的持续时间 */
  @ApiProperty()
  continuePeriod_min: number;

  /** 次数 -1: 不限次数，1: 单次*/
  @ApiProperty()
  times: number;

  @ApiProperty()
  isImportant: boolean;
  /** 提醒 */
  @ApiProperty()
  doAlarm: boolean;
}
