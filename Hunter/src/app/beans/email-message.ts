export class EmailMessage {
    msgId: number;
    msgDeliveryStatus: string;
    msgLifeStatus
    msgSendDate: string;
    msgTaskType: string;
    msgText: string;
    desiredReceivers: number;
    actualReceivers: number;
    confirmedReceivers: number;
    msgOwner: string;
    cretDate: Date;
    lastUpdate: Date;
    createdBy: string;
    lastUpdatedBy: string;
    provider: number;
}
