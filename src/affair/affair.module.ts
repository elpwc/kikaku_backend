import { Module } from '@nestjs/common';
import { AffairService } from './affair.service';
import { AffairController } from './affair.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affair } from './entities/affair.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Affair])],
  controllers: [AffairController],
  providers: [AffairService],
})
export class AffairModule {}
