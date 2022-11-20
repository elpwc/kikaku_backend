import { Module } from '@nestjs/common';
import { AffairService } from './affair.service';
import { AffairController } from './affair.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affair } from './entities/affair.entity';
import { AffairType } from 'src/affair-type/entities/affair-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Affair, AffairType])],
  controllers: [AffairController],
  providers: [AffairService],
})
export class AffairModule {}
