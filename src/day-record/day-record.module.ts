import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { DayRecordService } from './day-record.service';
import { DayRecordController } from './day-record.controller';
import { DayRecord } from './entities/day-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affair } from 'src/affair/entities/affair.entity';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DayRecord, Affair, User]), UserModule],
  controllers: [DayRecordController],
  providers: [DayRecordService],
})
export class DayRecordModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    const rootPath = 'day-record';
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: rootPath, method: RequestMethod.GET },
        { path: rootPath, method: RequestMethod.POST },
        { path: rootPath + '/:id', method: RequestMethod.PATCH },
        { path: rootPath + '/:id', method: RequestMethod.DELETE },
      );
  }
}
