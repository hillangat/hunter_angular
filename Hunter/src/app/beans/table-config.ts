
export interface TableConfig{

    tableId:string;
    totalRecs:number;
    numbPerPage:number;
    currPage:number;
    pageNumbers:number[];
    headers: string[];
    orderBy:string[];
    orderType:string;
    selDataIds:any[];
    data:any[];
    
}

