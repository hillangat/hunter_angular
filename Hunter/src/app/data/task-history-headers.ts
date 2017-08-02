
import { HunterTableConfig } from '../beans/hunter-table-configs';

export const TasksHistoryHeaders:HunterTableConfig[] = [
{
        "index":0, 
        "headerId":'historyId',
        "dataId":'historyId',
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
        "headerId":'evenName',
        "dataId":'historyId',
        "displayName":'Event Name',
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
        "headerId":'eventMessage',
        "dataId":'historyId',
        "displayName":'Event Message',
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
        "headerId":'eventDate',
        "dataId":'historyId',
        "displayName":'Event Date',
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
        "headerId":'eventUser',
        "dataId":'historyId',
        "displayName":'Event User',
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
        "headerId":'eventStatus',
        "dataId":'historyId',
        "displayName":'Event Status',
        "sortable":false,
        "show":true,
        "bootstrapIconName":null,
        "dataType":'string',
        'currentOrder':false,
        'isActionCol':false,
        'actionColIconName':null,
        'width':null 
    }
]