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

  constructor( private logger: LoggerService ) {
    Utility.logger = logger;
  }

}
