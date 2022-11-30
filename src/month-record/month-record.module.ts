import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MonthRecordService } from './month-record.service';
import { MonthRecordController } from './month-record.controller';
import { Affair } from 'src/affair/entities/affair.entity';
import { MonthRecord } from './entities/month-record.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MonthRecord, Affair, User]), UserModule],
  controllers: [MonthRecordController],
  providers: [MonthRecordService],
})
export class MonthRecordModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    const rootPath = 'month-record';
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
