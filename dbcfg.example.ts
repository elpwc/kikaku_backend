import { INDEV } from 'src/config';

export default {
  host: INDEV ? 'localhost' : '',
  port: 3306,
  username: 'root',
  password: INDEV ? '123456' : '',
  database: 'db',
};
