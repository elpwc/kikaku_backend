import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppDataSource } from './dataSource';
import { AffairModule } from './affair/affair.module';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), AffairModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
