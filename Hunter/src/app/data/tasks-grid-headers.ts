
import { HunterTableConfig } from '../beans/hunter-table-configs';

export const TasksGridHeaders:HunterTableConfig[] = [
    {
        "index":0, 
        "headerId":'taskId',
        "dataId":'taskId',
        "displayName":'ID',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'number',
        'currentOrder':false,
        'isActionCol':false,
        'actionColIconName':null,
        'width':'80px' 
    },{
        "index":1, 
        "headerId":'taskName',
        "dataId":'taskId',
        "displayName":'Name',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':false,
        'actionColIconName':null,
        'width':null 
    },{
        "index":2, 
        "headerId":'taskType',
        "dataId":'taskId',
        "displayName":'Type',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':false,
        'actionColIconName':null,
        'width':null 
    },{
        "index":3, 
        "headerId":'clientId',
        "dataId":'taskId',
        "displayName":'Client',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':false,
        'actionColIconName':null,
        'width':null 
    },{
        "index":4, 
        "headerId":'tskMsgType',
        "dataId":'taskId',
        "displayName":'Message Type',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':false,
        'actionColIconName':null,
        'width':null 
    },{
        "index":5, 
        "headerId":'cretDate',
        "dataId":'taskId',
        "displayName":'Created On',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':false,
        'actionColIconName':null,
        'width':null 
    },{
        "index":6, 
        "headerId":'taskDeliveryStatus',
        "dataId":'taskId',
        "displayName":'Progress',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':false,
        'actionColIconName':null,
        'width':null 
    },{
        "index":7, 
        "headerId":'taskLifeStatus',
        "dataId":'taskId',
        "displayName":'Status',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':false,
        'actionColIconName':null,
        'width':null 
    },{
        "index":8, 
        "headerId":'clone',
        "dataId":'taskId',
        "displayName":'Clone',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':true,
        'actionColIconName':'book', 
        'width':"80px" 
    },{
        "index":9, 
        "headerId":'process',
        "dataId":'taskId',
        "displayName":'Process',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':true,
        'actionColIconName':'play', 
        'width':"80px" 
    },{
        "index":10, 
        "headerId":'delete',
        "dataId":'taskId',
        "displayName":'Delete',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':true,
        'actionColIconName':'remove', 
        'width':"80px"
    },{
        "index":10, 
        "headerId":'open',
        "dataId":'taskId',
        "displayName":'Open',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':true,
        'actionColIconName':'circle-arrow-right', 
        'width':"80px" 
    }
  ]

  /**
   * 
   * {
        "description": "asdfasdf",
        "taskDateline": "2017-05-26 20:03",
        "taskApproved": true,
        "taskApprover": "admin",
        "updatedBy": "admin",
        "srlzdTskPrcssJbObjsFilLoc": null,
        "taskDeliveryStatus": "Failed",
        "desiredReceiverCount": 1,
        "taskLifeStatus": "Processed",
        "availableReceiverCount": 0,
        "confirmedReceiverCount": 0,
        "taskName": "dasdfasdf",
        "taskId": 4,
        "taskGroups": [],
        "clientId": 1,
        "taskRegions": [],
        "taskMessage": {
            "toPhone": null,
            "pageWordCount": 0,
            "fromPhone": null,
            "pageable": false,
            "text": null,
            "disclaimer": null,
            "provider": {
                "providerId": 1,
                "providerName": "Safaricom",
                "cstPrAudMsg": 2,
                "cstPrTxtMsg": 1
            },
            "msgDeliveryStatus": "Conceptual",
            "actualReceivers": 5000,
            "confirmedReceivers": 0,
            "desiredReceivers": 0,
            "msgId": 4,
            "msgLifeStatus": "Processed",
            "msgText": "asdfasdfasdf",
            "createdBy": "admin",
            "lastUpdate": "2017-05-26 20:55",
            "lastUpdatedBy": "admin",
            "cretDate": "2017-05-26 20:03",
            "msgOwner": "admin",
            "msgSendDate": "2017-05-26 20:56",
            "msgTaskType": "Text"
        },
        "tskMsgType": "Text",
        "tskAgrmntLoc": null,
        "createdBy": "admin",
        "taskType": "Political",
        "lastUpdate": "2017-05-26 20:57",
        "processedBy": null,
        "processedOn": null,
        "recurrentTask": true,
        "gateWayClient": "CM",
        "taskObjective": "asdfasdf",
        "taskCost": 0,
        "taskBudget": 10000,
        "cretDate": "2017-05-26 20:03"
    }
   */