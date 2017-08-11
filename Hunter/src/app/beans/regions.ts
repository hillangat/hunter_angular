
export class Country{
    countryId:number;
	countryName:string;
	capital:string;
	hasState:boolean;
	hunterPopulation:number;
	countryPopulation:number;
    countryCode:string;
    cretDate:string;
	createdBy:string;
	lastUpdate:string;
	lastUpdatedBy:string;
}

export class County{
    countyId:number;
	countyName:string;
	countyPopulation:number;
	hunterPopulation:number;
	hasState:boolean;
	mapDots:string;
	stateId:number;
	countryId:number;
    countyCode:number;
    cretDate:string;
	createdBy:string;
	lastUpdate:string;
	lastUpdatedBy:string;
}

export class Constituency{
    cnsttncyId:number;
	cnsttncyName:string;
	cnsttncyPopulation:number;
	hunterPopulation:number;
	cnsttncyCity:string;
	constituencyCode:string;
	countyId:number;
    mapDots:string;
    cretDate:string;
	createdBy:string;
	lastUpdate:string;
	lastUpdatedBy:string;
}

export class ConstituencyWard{
    wardId:number;
	wardName:string;
	wardPopulation:number;
	hunterPopulation:Number;
	mapDots:string;	
	constituencyWardCode:string;
    constituencyId:number;
    cretDate:string;
	createdBy:string;
	lastUpdate:string;
	lastUpdatedBy:string;
}


