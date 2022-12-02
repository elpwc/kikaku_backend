import { DataSource } from 'typeorm';
import * as dbcfg from '../dbcfg';
import { INDEV } from './config';

export const AppDataSource = new DataSource({
  type: 'mysql',
  entities: [(INDEV ? 'dist' : __dirname) + '/**/*.entity{.ts,.js}'],
  synchronize: true,
  ...dbcfg.default,
});

AppDataSource.initialize();
