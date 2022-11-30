import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { WeekRecordService } from './week-record.service';
import { WeekRecordController } from './week-record.controller';
import { WeekRecord } from './entities/week-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affair } from 'src/affair/entities/affair.entity';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([WeekRecord, Affair, User]), UserModule],
  controllers: [WeekRecordController],
  providers: [WeekRecordService],
})
export class WeekRecordModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    const rootPath = 'week-record';
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
