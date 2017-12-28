import { ServerStatuses } from './server-status-response';
import { HunterTableConfig } from './hunter-table-configs';

export class HunterServerResponse {
    status: string;
    message: string;
    data: any[];
    headers: HunterTableConfig[] | undefined;
}
