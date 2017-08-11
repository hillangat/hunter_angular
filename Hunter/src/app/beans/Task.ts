import { TaskGroup } from './task-group';
import { Provider } from './provider';

export class Task {
    description: string;
    taskDateline: Date;
    taskApproved: boolean;
    taskApprover: string;
    updatedBy: string;
    srlzdTskPrcssJbObjsFilLoc: string;
    taskDeliveryStatus: string;
    desiredReceiverCount: number;
    taskLifeStatus: string;
    availableReceiverCount: number;
    confirmedReceiverCount: number;
    taskName: string;
    taskId: number;
    taskGroups: TaskGroup[];
    clientId: number;
    taskRegions: any[];
    taskMessage: any;
    tskMsgType: string;
    tskAgrmntLoc: string;
    createdBy: string;
    taskType: string;
    lastUpdate: string;
    processedBy: string;
    processedOn: string;
    recurrentTask: boolean;
    gateWayClient: string;
    taskObjective: string;
    taskCost: number;
    taskBudget: number;
    cretDate: string;
}