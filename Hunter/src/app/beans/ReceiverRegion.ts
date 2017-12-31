import { AuditInfo } from './AuditInfo';
export class ReceiverRegion {
    public regionId: number;
    public country: string;
    public state: string;
    public hasState: boolean;
    public county: string;
    public constituency: string;
    public city: string;
    public ward: string;
    public village: string;
    public longitude: number;
    public latitude: number;
    public currentLevel: string;
    public borderLongLats: string;
    public auditInfo: AuditInfo;
}
