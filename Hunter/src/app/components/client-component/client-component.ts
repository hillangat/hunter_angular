import { Component, Input, Output, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../services/alert-service';
import { Alert, AlertType } from '../../beans/alert';
import { ClientHeaders } from '../../data/clients-headers';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { utilFuncs } from '../../utilities/util-functions';
import { ActivatedRoute,Router } from '@angular/router';
import { HunterClientService } from "app/services/hunter-client-service";
import { ServerResponse } from '../../beans/ServerResponse';
import { Client } from '../../beans/client';




@Component({
    selector:'clients',
    moduleId:module.id,
    templateUrl:'client-component.html',
    styleUrls: [ 'client-component.css' ],
    inputs:[  ]
})

export class ClientComponent implements OnInit{

    @ViewChild('hunterTable') hunterTable;

    private nextClientId:number = 0;    
    private clients:Client[] = [];
    private headers:any[] = ClientHeaders;
    private modalAction:string;

    private currFunc:string = null;
    private currDataId:number = null;
    private index:number;
    private popupModalTitle:string = 'Delete Task History';    

    private confirmingDelete:boolean = false;
    @ViewChild('confirmAlert') confirmAlert;

    private currClientMode:string = null;
    private clientEditForm: FormGroup; 
    private showEditClientModal:boolean = false;
    private clientModeTitle:string = '';
    @ViewChild('clientEditModal') clientEditModal;

    private clientBeingEdited:Client = null;
    

    constructor( 
        private alertService:AlertService,
        private formBuilder: FormBuilder,
        private route:ActivatedRoute,  
        private router: Router,
        private clientsService:HunterClientService
    ){}

    ngOnInit(){              
        this.loadAllClients();
        this.initClientForm();
    }

    public loadAllClients(){        
        this.clientsService.getAllClients().then(           
            ( serverResp: ServerResponse )  => {                
                console.log( JSON.stringify(serverResp) );
                if ( serverResp.status === 'Success' ) {
                    this.clients = serverResp.data as Client[];
                    for( var i=0; i<this.clients.length; i++ ){
                        this.nextClientId = this.clients[i].clientId > this.nextClientId ? this.clients[i].clientId : this.nextClientId; 
                    }
                    this.nextClientId++;                
                  }else{
                    this.alertService.error('Error: ' + serverResp.message, false);                                   
                  }                
            },
            error => {
                this.alertService.error( JSON.stringify(error) );                
            }
        );
    }

    public removeHuntaTableOverlay(){
        if( this.hunterTable ){         
            this.hunterTable.removeOverlay();            
        }
    }

    public getClients(){        
        console.log( 'Loading clients' );
    }

    handleGridAction(params:any[]){
        
        this.currFunc   = params[0]; 
        this.currDataId = params[1];
        this.index      = -1;     
        
        this.getCurrTaskIdAndSetIndex(); 
        
        switch( this.currFunc ){
          case 'delete' : 
            this.modalAction = "DeleteTask";
            this.openConfirmAlertModal();
            break;
          case 'edit' : 
            this.clientModeTitle = "Edit Selected Client";
            this.clientBeingEdited = this.getClientForClientId(this.currDataId);
            this.currClientMode = 'edit';
            this.initClientFormForEdit();     
            this.clientEditModal.show();       
            break;
          case 'NewRecord' :             
            this.clientModeTitle = 'Create New Client';
            this.currClientMode = 'NewRecord';
            this.initClientForm();
            this.clientEditModal.show();
            break;
          case 'refresh' :
            this.modalAction = "refresh";                     
            break;
          case 'tasks' :
            this.modalAction = "tasks"
            this.hunterTable.showOverlay();
            this.router.navigateByUrl('tasks');
            break;
          default:
            console.warn( 'No equivalent found for function = ' + this.currFunc );
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

    removeClientWithId(clientId: number) {
        let client = this.getClientForClientId(clientId);
        if( client ){
            this.clientsService.removeClient(client.clientId).then(response => {

            });
        }else{
            this.alertService.error('Client with id=' + clientId + ' not found!!');
        }
    }

    getClientForClientId( clientId:number ){
        for (var i = 0; i < this.clients.length; i++) {
            var client = this.clients[i];
            if (client.clientId == clientId) {
                return client;
            }
        }
    }

    private customValidatorMessages = {
        firstName: "First name is required",
        lastName:"Last name is required.",
        email:"Client email is requiired",
        userName:"Client user name is required" ,
        region: "Region is required",
        budget:"Budget is required. Must be greater than  $49 and less than $10,000"       
    }

    initClientForm(){
        this.clientEditForm = this.formBuilder.group({
            firstName:  ['',  [ <any>Validators.required ] ],
            lastName: ['', [ <any>Validators.required ] ],
            email: ['', [ <any>Validators.required ] ],
            budget:['', [ <any>Validators.required, <any>Validators.min(50), <any>Validators.max(10000) ] ],
            userName:['', [ <any>Validators.required ] ],
            receiver:[false]
        });
      }

      initClientFormForEdit(){
          if( !this.clientBeingEdited ){
              this.alertService.error('Client to be edited not set!!');
              return;
          }
          this.initClientForm();
          let controls = this.clientEditForm.controls;
          controls['firstName'].setValue(this.clientBeingEdited.firstName);
          controls['lastName'].setValue(this.clientBeingEdited.lastName);
          controls['email'].setValue(this.clientBeingEdited.email);
          controls['userName'].setValue(this.clientBeingEdited.userName);
          controls['receiver'].setValue(this.clientBeingEdited.receiver);
          controls['budget'].setValue(this.clientBeingEdited.clientTotalBudget);
      }

      getClientFromForm(){

      }

      saveClientData(){
          
          if( this.clientEditForm.valid ){
            
            this.hunterTable.showOverlay();
            
            
            let client = this.currClientMode == 'edit' ? this.clientBeingEdited : new Client(); 
            client.clientId = this.nextClientId;
            client.firstName = this.clientEditForm.controls['firstName'].value;
            client.lastName = this.clientEditForm.controls['lastName'].value;
            client.email = this.clientEditForm.controls['email'].value;
            client.clientTotalBudget = this.clientEditForm.controls['budget'].value;
            client.userName = this.clientEditForm.controls['userName'].value;
            client.receiver = this.clientEditForm.controls['receiver'].value;              
            client.lastUpdatedBy = 'admin';

            let newDateStr = this.getFormatedDate( new Date() );            
            client.updatedOn = newDateStr;

            /** If it's a new client, set creation audit info */
            if( this.currClientMode == 'NewRecord' ){
                client.cretDate  = newDateStr;
                client.createdBy = 'admin';
            }

            setTimeout(() => {
                if( this.currClientMode == 'edit' ){  
                    this.clientsService.updateClient(client).catch(error => {                        
                        this.removeOverlayAndAlert(error.message, 'Error');
                    }).then(() => {                        
                        this.removeOverlayAndAlert('Successfully updated client', 'Success');
                    });
                }else if( this.currClientMode == 'NewRecord' ){
                    this.clientsService.createClient( client ).catch(error => {                        
                        this.removeOverlayAndAlert(error.message, 'Error');
                    }).then(() => {
                        this.removeOverlayAndAlert('Successfully saved client', 'Success');
                        this.loadAllClients();
                    });
                }else{                    
                    this.removeOverlayAndAlert('Error occurred while trying to save client data!!', 'Error');
                }
            }, 800);

            this.clientEditModal.hide();
            this.initClientForm();

          }else{            
              this.alertService.warn( 'Please correct errors and try again.', false );
          }
                    
      }

      onHidden(){
          /**
           * Used for any functions that run once the modal closes.
           */
      }

      removeOverlayAndAlert( message:string, type:string ){
        this.hunterTable.removeOverlay();                    
        this.hunterTable.initializeDataGrid();
        switch( type ){
            case 'Success' :
                this.alertService.success(message, false);
                break;
            case 'Error' :
                this.alertService.error(message, false);
                break;
            default:
                this.alertService.warn(message, false);
                break;
        }
      }


      getFormatedDate(date:Date){
        
        let 
        year:string     = date.getFullYear() + "",
        month:string    = date.getMonth() + "",
        date_:string    = date.getDate() + "",
        hour:string     = date.getHours() + "",
        minute:string   = date.getMinutes() + "",
        secs:string     = date.getSeconds() + "",
        formatedDate    = year + "-" + month + "-" + date_ + " " + hour + ":" + minute + ":" + secs;        

        month  = month.length  < 2 ? "0" + month  : month;
        date_  = date_.length  < 2 ? "0" + date_  : date_;
        minute = minute.length < 2 ? "0" + minute : minute;
        secs   = secs.length   < 2 ? "0" + secs   : secs;

        return formatedDate;
      }

      closeClientEditModal(){
        this.clientEditModal.hide();
      }

      showClientEditModal(){
          this.clientEditModal.show();
      }
      



    
}