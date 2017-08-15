import { Component, Input, Output, OnInit,ViewChild } from '@angular/core';
import { AlertService } from '../../services/alert-service';
import { Alert, AlertType } from '../../beans/alert';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Client } from '../../beans/Client';
import { ClientHeaders } from '../../data/clients-headers';
import { ModalDirective } from 'ngx-bootstrap/modal';



@Component({
    selector:'clients',
    moduleId:module.id,
    templateUrl:'client-component.html',
    styleUrls: [ 'client-component.css' ],
    inputs:[  ]
})

export class ClientComponent implements OnInit{

    @ViewChild('hunterTable') hunterTable;

    private clientsObservable: FirebaseListObservable<Client[]>;  
    private clients:Client[] = [];
    private headers:any[] = ClientHeaders;
    private modalAction:string;

    private currFunc:string = null;
    private currDataId:number = null;
    private index:number;
    private popupModalTitle:string = 'Delete Task History';    
    private selActionDispName:string = null;

    private confirmingDelete:boolean = false;
    @ViewChild('confirmAlert') confirmAlert;
    

    constructor( private database:AngularFireDatabase,private alertService:AlertService  ){}

    ngOnInit(){
        this.clientsObservable = this.database.list('/clients') as FirebaseListObservable<Client[]>; 
        this.getClients();
    }

    public getClients(){        
        this.clientsObservable.subscribe(clients => {
            console.log(JSON.stringify(clients));
            this.clients = clients;            
            if( this.hunterTable ){            
                this.hunterTable.removeOverlay();            
            }
        });
    }

    handleGridAction(params:any[]){
        
        this.currFunc   = params[0]; 
        this.currDataId = params[1];
        this.index      = -1;     
        
        this.getCurrTaskIdAndSetIndex(); 
  
        switch( this.currFunc ){
          case 'delete' : 
            this.modalAction = "DeleteTask";
            this.selActionDispName = "Delete"; 
            this.openConfirmAlertModal();
            break;
          case 'edit' : 
            console.log( 'Editing task not allowed here. Doing nothing' );
            this.selActionDispName = "Edit";
            break;
          case 'refresh' :
            this.modalAction = "refresh"
            this.selActionDispName = "refresh";
            setTimeout(()=>{
                this.getClients();
            },1500);            
            break;          
        }
  
    }
    
    
    getCurrTaskIdAndSetIndex(){
        for(var i=0; i<this.clients.length; i++ ){
          var clientId = this.clients[i].clientId;
          if( clientId == this.currDataId ){
            this.currDataId = clientId;
            this.index = i;
          }
        }
    }

    getCurrentDataId(){
        return this.currDataId;
    }

    onConfirm( params:any[] ){
        
        
        let type = params[0];
        let marker = params[1];
        let dataId = params[2];
        
        if( marker == 'RemoveClient' && type == 'yes' ){ 
          this.removeClientWithId( dataId );
          this.closeConfirmAlertModal();
        }else if( marker == 'RemoveClient' && type == 'no' ){
          this.closeConfirmAlertModal();      
        }
    
      }

      closeConfirmAlertModal(){
        this.confirmingDelete = false;
        this.confirmAlert.hideModal();
        this.hunterTable.initializeDataGrid();
      }

      openConfirmAlertModal(){        
        this.confirmingDelete = true;  
        if( this.confirmAlert ){
            this.confirmAlert.showModal();          
        }        
    }

      removeClientWithId( clientId:number ){
          for( var i=0; i<this.clients.length; i++ ){
              var client = this.clients[i];
              if( client.clientId == clientId ){
                this.clients.splice(i,1);
                break;
              }
          }
          this.alertService.success('Successfully deleted client', false);
      }


    
}