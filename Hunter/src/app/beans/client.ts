import { Region } from './region';

export class Client{
  $key?:number;
  clientId:number;
	clientTotalBudget:number;
	receiver:boolean;
	taskIds:number[];
  firstName:string;
  lastName:string;
  email:string;
  userName:string;
	cretDate:string;
	lastUpdate:string;
	createdBy:string;
  lastUpdatedBy:string;
  region:Region;
}
