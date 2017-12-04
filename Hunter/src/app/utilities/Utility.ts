import { Constants } from './Constants';

export default class Utility {

  public static ITEMS_BASE_URL = '/localhost:8080/';

  public static getItemsUrlForPath( path: string ): string {
    const url = Utility.ITEMS_BASE_URL + '/' + path;
    console.log( url );
    return url;
  }

}
