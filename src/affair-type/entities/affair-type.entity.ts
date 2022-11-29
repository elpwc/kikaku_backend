import { ApiProperty } from '@nestjs/swagger';
import { Affair } from 'src/affair/entities/affair.entity';
import { User } from 'src/user/entities/user.entity';
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
export class AffairType {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @OneToMany(() => Affair, (affair) => affair.type)
  @JoinColumn()
  @ApiProperty()
  affairs: Affair[];

  @ManyToOne(() => User, (user) => user.affairTypes)
  @ApiProperty({ type: () => User })
  user: User;

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
