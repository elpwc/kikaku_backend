import { DataSource } from 'typeorm';
import * as dbcfg from '../dbcfg';

export const AppDataSource = new DataSource({
  type: 'mysql',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  ...dbcfg.default,
});

AppDataSource.initialize();
