import { Constants } from './Constants';

export default class Utility {

  public static ITEMS_BASE_URL: string = '/localhost:8080/';

  public static getItemsUrlForPath( path:string ) : string {
    let url = Utility.ITEMS_BASE_URL + "/" + path;
    console.log( url );
    return url;
  }

}
