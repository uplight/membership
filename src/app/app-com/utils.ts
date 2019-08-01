import * as moment from 'moment';

export function mysqlTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}
