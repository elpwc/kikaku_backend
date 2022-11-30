import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { YearRecordService } from './year-record.service';
import { YearRecordController } from './year-record.controller';
import { YearRecord } from './entities/year-record.entity';
import { Affair } from 'src/affair/entities/affair.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([YearRecord, Affair, User]), UserModule],
  controllers: [YearRecordController],
  providers: [YearRecordService],
})
export class YearRecordModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    const rootPath = 'year-record';
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
