import { Constants } from './Constants';

export class Utility{

  constructor( private cons:Constants ){}

  public getItemsUrlForPath( path:string ) : string {
    let url = this.cons.ITEMS_BASE_URL + "/" + path;
    console.log( url );
    return url;
  }

}
