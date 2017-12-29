import { Constants } from './Constants';
import { LoggerService } from '../common/logger.service';

export default class Utility {

  public static ITEMS_BASE_URL = '/localhost:8080/';
  private static logger: LoggerService;

  public static getItemsUrlForPath( path: string ): string {
    const url = Utility.ITEMS_BASE_URL + '/' + path;
    Utility.logger.log( url );
    return url;
  }

  public static getFormatedDate(date: Date) {

    const
    year: string     = date.getFullYear() + '',
    hour: string     = date.getHours() + '';

    let
    month: string    = date.getMonth() + '',
    date_: string    = date.getDate() + '',
    minute: string   = date.getMinutes() + '',
    secs: string     = date.getSeconds() + '';

    const formatedDate    = year + '-' + month + '-' + date_ + ' ' + hour + ':' + minute + ':' + secs;

    month  = month.length  < 2 ? '0' + month  : month;
    date_  = date_.length  < 2 ? '0' + date_  : date_;
    minute = minute.length < 2 ? '0' + minute : minute;
    secs   = secs.length   < 2 ? '0' + secs   : secs;

    return formatedDate;
  }

  constructor( private logger: LoggerService ) {
    Utility.logger = logger;
  }

}
