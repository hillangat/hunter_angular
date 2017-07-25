import { Component,Input, Output, EventEmitter } from '@angular/core';
import { taskHistory } from '../../data/mocked-task-history';

@Component({  
  moduleId:module.id,
  selector: 'hunter-table-config',
  templateUrl: 'hunter-table-config.html',
  styleUrls: ['hunter-table-config.css'],
  inputs: [ 'headers','hunterTableData' ]
})
export class HunterTableConfig {

     @Output() handleGridAction = new EventEmitter<any[]>();

    getBootstrapClass( name:string ){
        return 'glyphicon glyphicon-' + name;
    }

    getDatumForHeader(header:HunterTableConfig, row:any){
        let fieldId  = header['headerId']; //history ID
        let value = row[fieldId]; // 49484
    }

    getRowDataId(datum, header){
        if( datum == null || datum.length == 0 ){
            console.log( 'getRowDataId empty datum argument'  );
        }
        if( header == null || header.length == 0 ){
            console.log( 'getRowDataId empty header argument'  );
        }
        return datum[header.dataId]
    }

    onClickButton( funcName:string, dataId:any ){
        console.log(funcName);
        this.handleGridAction.emit([funcName, dataId]);
    }

    
    

    

}