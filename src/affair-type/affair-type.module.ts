import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AffairTypeService } from './affair-type.service';
import { AffairTypeController } from './affair-type.controller';
import { AffairType } from './entities/affair-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AffairType, User]), UserModule],
  controllers: [AffairTypeController],
  providers: [AffairTypeService],
})
export class AffairTypeModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'affair-type', method: RequestMethod.GET },
        { path: 'affair-type', method: RequestMethod.POST },
        { path: 'affair-type/:id', method: RequestMethod.PATCH },
        { path: 'affair-type/:id', method: RequestMethod.DELETE },
      );
  }
}
