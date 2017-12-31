import { ReceiverRegion } from './ReceiverRegion';
import { TaskGroup } from './task-group';
import { TaskMessage } from './TaskMessage';

export class Task {
    public taskId: number;
    public clientId: number;
    public taskType: string;
    public taskName: string;
    public taskObjective: string;
    public description: string;
    public tskAgrmntLoc: string;
    public tskMsgType: string;
    public taskBudget: number;
    public taskCost: number
    public recurrentTask: boolean;
    public taskDateline: number;
    public taskLifeStatus: string;
    public taskDeliveryStatus: string;
    public taskApproved: boolean;
    public taskApprover: string;
    public gateWayClient: string;
    public desiredReceiverCount: string;
    public availableReceiverCount: string;
    public confirmedReceiverCount: string;
    public srlzdTskPrcssJbObjsFilLoc: string;
    public processedBy: string;
    public processedOn: number;
    public cretDate: number;
    public lastUpdate: number;
    public updatedBy: string;
    public createdBy: string;
    public taskMessage: TaskMessage;
    public taskRegions: ReceiverRegion;
    public taskGroups: TaskGroup[]

    /** Extra details loaded separately */
    public updatedByStr: string;
    public createdByStr: string;
    public processedByStr: string;
}
