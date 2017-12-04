
export class Alert {
    id: number;
    type: AlertType;
    message: string;
    constructor() {
        this.id = new Date().getTime();
    }
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
