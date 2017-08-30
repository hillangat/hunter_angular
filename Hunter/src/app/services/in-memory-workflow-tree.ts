import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemHeroService implements InMemoryDbService {  
  createDb() {
    let workflowtree = [
      { groupid:1,stepId:1,stepCode:"001",stepType:"Workflow",stepName:"Create Art",parentId:0,drools:"IT005,008,009",committeeFlag:false },
      { groupid:1,stepId:2,stepCode:"002",stepType:"adhoc",stepName:"Create Art 1",parentId:1,drools:null,committeeFlag:false },
      { groupid:1,stepId:3,stepCode:"003",stepType:"adhoc",stepName:"Create Art 2",parentId:1,drools:null,committeeFlag:false },
      { groupid:1,stepId:4,stepCode:"004",stepType:"adhoc",stepName:"Create Art 3",parentId:1,drools:null,committeeFlag:false }
    ];
    return {workflowtree};
  }
}

/**
 
    

 */