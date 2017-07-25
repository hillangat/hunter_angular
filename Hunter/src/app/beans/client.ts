import { Region } from './region';

export interface Client{
  userKey:string;
  remainingBudget:number;
  originalBudget:number;
  region:Region;
  createdOn:Date;
  createdByUserKey:number;
  updatedOn:Date;
  updatedByUserKey:number;
}
