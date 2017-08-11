import { Injectable, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Country,County,Constituency,ConstituencyWard } from '../beans/regions';


@Injectable()
export class RegionService {
    
    countries:Country[];

    getAllCountrie(){
        
    }

    getCountiesForCountry( countryId:number ){

    }

    getConsntituenciesForCounty( countyId:number ){

    }

    getConsntituencyWardsForConstituency( constituencyId:number ){

    }

}
