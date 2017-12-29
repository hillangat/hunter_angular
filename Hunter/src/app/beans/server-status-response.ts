
export class ServerStatusResponse {
    status: ServerStatuses;
    message: string;
}

export enum ServerStatuses {
    Success, Failed, Status, Message
}

