import { Component } from '@angular/core';
import { HunterTableConfig } from '../../beans/hunter-table-configs';
import { taskHistory } from '../../data/mocked-task-history';

@Component({
    moduleId:module.id,
    selector:'home-component',
    templateUrl: 'home.html',
    styleUrls: ['home.css']    
})
export class HomeComponent{

  currFunc:string = null;
  currDataId:number = null;


  headers:Array<HunterTableConfig> = [
    {"index":0, "headerId":'historyId',"dataId":'historyId',"displayName":'ID',"sortable":true,"show":true,"bootstrapIconName":null,"dataType":'number','currentOrder':false,'isActionCol':false,'actionColIconName':null },
    {"index":1, "headerId":'evenName',"dataId":'historyId',"displayName":'Event Name',"sortable":true,"show":true,"bootstrapIconName":'search',"dataType":'string','currentOrder':false,'isActionCol':false,'actionColIconName':null },
    {"index":2, "headerId":'eventMessage',"dataId":'historyId',"displayName":'Event Message',"sortable":true,"show":true,"bootstrapIconName":'remove',"dataType":'string','currentOrder':false,'isActionCol':false,'actionColIconName':null },
    {"index":3, "headerId":'eventDate',"dataId":'historyId',"displayName":'Event Date',"sortable":true,"show":true,"bootstrapIconName":'calendar',"dataType":'string','currentOrder':false,'isActionCol':false,'actionColIconName':null },
    {"index":4, "headerId":'eventUser',"dataId":'historyId',"displayName":'Event User',"sortable":true,"show":true,"bootstrapIconName":'user',"dataType":'string','currentOrder':false,'isActionCol':false,'actionColIconName':null },
    {"index":5, "headerId":'eventStatus',"dataId":'historyId',"displayName":'Event Status',"sortable":true,"show":true,"bootstrapIconName":'clock',"dataType":'string','currentOrder':true,'isActionCol':false,'actionColIconName':null },
    {"index":5, "headerId":'edit',"dataId":'historyId',"displayName":'Edit',"sortable":false,"show":false,"bootstrapIconName":'edit',"dataType":'string','currentOrder':false,'isActionCol':true,'actionColIconName':'pencil' },
    {"index":5, "headerId":'delete',"dataId":'historyId',"displayName":'Delete',"sortable":false,"show":false,"bootstrapIconName":'remove',"dataType":'string','currentOrder':false,'isActionCol':true,'actionColIconName':'remove' }
  ]

  hunterTableData = [
        {"taskId":4,"evenName":"Change Status","eventMessage":"Failed to clone task.Client already has a task with this task name.","historyId":56,"eventDate":"2017-05-27 17:55","eventUser":"mathash","eventStatus":"Failed"},
        {"taskId":4,"evenName":"Clone","eventMessage":"Successfully cloned task. New task ( 11 ) for new user ( admin )","historyId":79,"eventDate":"2017-05-27 17:55","eventUser":"mathash","eventStatus":"Success"},
        {"taskId":4,"evenName":"Clone","eventMessage":"Successfully cloned task. New task ( 10 ) for new user ( admin )","historyId":78,"eventDate":"2017-05-27 17:55","eventUser":"mathash","eventStatus":"Success"},
        {"taskId":4,"evenName":"Clone","eventMessage":"Failed to clone task.Client already has a task with this task name.","historyId":77,"eventDate":"2017-05-27 17:55","eventUser":"mathash","eventStatus":"Failed"},
        {"taskId":4,"evenName":"Clone","eventMessage":"Successfully cloned task. New task ( 9 ) for new user ( admin )","historyId":76,"eventDate":"2017-05-27 17:55","eventUser":"mathash","eventStatus":"Success"},
        {"taskId":4,"evenName":"Clone","eventMessage":"Failed to clone task.Client already has a task with this task name.","historyId":75,"eventDate":"2017-05-27 17:55","eventUser":"mathash","eventStatus":"Failed"},
        {"taskId":4,"evenName":"Clone","eventMessage":"Successfully cloned task. New task ( 8 ) for new user ( admin )","historyId":74,"eventDate":"2017-05-27 17:55","eventUser":"mathash","eventStatus":"Success"},
        {"taskId":4,"evenName":"Process","eventMessage":"Successfully processed task!","historyId":58,"eventDate":"2017-05-26 21:26","eventUser":"admin","eventStatus":"Success"}        
    ];

  
 

  constructor( ){}

    handleGridAction(params:any[]){
      
      
      this.currFunc   = params[0]; 
      this.currDataId = params[1];
      
      let index    = -1;

      if( this.currFunc == 'delete' ){
        for(var i=0; i<this.hunterTableData.length; i++ ){
          var historyId = this.hunterTableData[i].historyId;
          if( historyId == this.currDataId ){
            this.currDataId = historyId;
            index = i;
          }
        }
        if( index != -1 ){
          this.hunterTableData.splice( index, 1 );
        }else{
          console.error( 'No index to be deleted found!! Bad data! funcName = ' + this.currFunc + ', dataId = ' + this.currDataId );
        }
      }else if( this.currFunc == 'edit' ){
        alert('Opening edit....');
      }
    }
  

}
