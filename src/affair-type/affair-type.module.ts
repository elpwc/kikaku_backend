import { Module } from '@nestjs/common';
import { AffairTypeService } from './affair-type.service';
import { AffairTypeController } from './affair-type.controller';
import { AffairType } from './entities/affair-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AffairType])],
  controllers: [AffairTypeController],
  providers: [AffairTypeService],
})
export class AffairTypeModule {}
