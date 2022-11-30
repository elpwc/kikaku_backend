import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AffairService } from './affair.service';
import { AffairController } from './affair.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Affair } from './entities/affair.entity';
import { AffairType } from 'src/affair-type/entities/affair-type.entity';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Affair, AffairType, User]), UserModule],
  controllers: [AffairController],
  providers: [AffairService],
})
export class AffairModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    const rootPath = 'affair';
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
