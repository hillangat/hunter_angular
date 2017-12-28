import { BActionDisplayEnum } from './BActionDisplayEnum';
import { ActionTypeEnum } from './ActionTypeEnum';
import BarAction from './BarAction';

export default class HunterTableUtil {

    public static getBarActions(): BarAction[] {
        const barActions: BarAction[] = [];
        const barAction: BarAction = BarAction.create(
          'create',
          ActionTypeEnum.CREATE,
          BActionDisplayEnum.BUTTON_ICON,
          'Create New Task',
          'glyphicon glyphicon-plus',
          'btn hunterButton'
        );
        const barAction2: BarAction = BarAction.create(
          'create',
          ActionTypeEnum.EXPORT_TO_EXCEL,
          BActionDisplayEnum.BUTTON_ICON,
          'Export Data',
          'glyphicon glyphicon-file',
          'btn hunterButton'
        );
        barActions.push( barAction );
        barActions.push( barAction2 );
        return barActions;
      }

}
