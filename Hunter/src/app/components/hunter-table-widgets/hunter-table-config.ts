import { Component, Input, Output, OnInit, EventEmitter,ElementRef } from '@angular/core';
import { taskHistory } from '../../data/mocked-task-history';

@Component({
    moduleId: module.id,
    selector: 'hunter-table-config',
    templateUrl: 'hunter-table-config.html',
    styleUrls: ['hunter-table-config.css'],
    inputs: ['headers', 'hunterTableData']
})
export class HunterTableConfig implements OnInit {

    @Output() handleGridAction = new EventEmitter<any[]>();
    @Output() createNewAction = new EventEmitter<string>();

    @Input('hunterTableData') hunterTableData:any[];
    private visibleHunterTableData:any[];
    
    private overIsOn: boolean = false;    
    private hasNewRowButton:boolean = true;
    private dataBeanName:string = "Task History";
    private calculatedPageNumbers:number = 0;
    private calculatedPageNumberArray:number[] = [];
    private visiblePageNumbers:number[] = [];
    private itemsPerPage:number[] = [ 4,5,20,50,100,200,500 ];
    private displaySelItemsPerPage:string = this.itemsPerPage[0]+"";
    private selItemsPerPage:number = this.itemsPerPage[0];
    private maxVisiblePageNos:number = 3;
    private totalRowNum:number = 0;
    private currentPageNo:number = 1;
    private startIndex:number = 0 ;
    private endIndex:number = 0 

    


    constructor( private ref: ElementRef ){
        console.log( 'Starting it up...' );
    }

    ngOnInit(){        
        this.initializeDataGrid();
    }

    initializeDataGrid(){
        this.calculatePageNumbers();
        this.redrawBubblePages();
        this.updateVisibleHunterTableData();
    }

    calculatePageNumbers(){
        
        this.totalRowNum = this.hunterTableData.length;

        /** If the user selects 'All', then the page number is equal to 1 */
        if( this.selItemsPerPage == 0 ){
            this.calculatedPageNumbers = 1;
            console.log( this.calculatedPageNumbers );
            this.redrawBubblePages();
            return;
        }
        if( this.selItemsPerPage >= this.totalRowNum ){
            this.calculatedPageNumbers = 1;
            this.redrawBubblePages();       
            return;
        }

        
        /** If there is a decimal, the page no is +1 */
        let pageNo  = this.totalRowNum / this.selItemsPerPage; // 8 divide by 2 = 4
        let decimal = pageNo - Math.floor(pageNo);        
        this.calculatedPageNumbers = decimal >= 0 ? (pageNo++) : pageNo;

        /** There has gotta be at least one page */
        this.calculatedPageNumbers = this.calculatedPageNumbers < 1 ? 1 : this.calculatedPageNumbers;
    }

    setItemsPerPage( _selItemsPerPage ){
        this.selItemsPerPage = _selItemsPerPage;      
        this.displaySelItemsPerPage = _selItemsPerPage == 0 ? "All" : _selItemsPerPage + "";       
        this.currentPageNo = 1; 
        this.initializeDataGrid();
    }

    

    updateVisibleHunterTableData(){
        
        if( this.calculatedPageNumbers == 1 ){
            this.startIndex = 0;
            this.endIndex =  this.hunterTableData.length - 1;
            this.visibleHunterTableData = this.hunterTableData;
            this.startIndex = 0;
            this.endIndex = this.hunterTableData.length;
            return;
        }      

        this.visibleHunterTableData = [];

        this.startIndex = ((this.currentPageNo-1)*this.selItemsPerPage);
        this.endIndex   = this.startIndex + this.selItemsPerPage;

        for( var i = this.startIndex; i<this.endIndex; i++ ){
            if( this.hunterTableData.length > i ){
                this.visibleHunterTableData.push(this.hunterTableData[i]);
            }else{
                break;
            }
        }
    }
    
    getStyleForSelPageCircle( pageNo ){        
        return this.currentPageNo == pageNo ? '#D6F0F2' : '';
    }
    
    setCurrentPage( selPageNo ){
        this.currentPageNo = selPageNo;  
        //this.updateVisibleHunterTableData();
        this.initializeDataGrid();                   
    }

    redrawBubblePages(){
        
        this.calculatedPageNumberArray = [];            

        for(var i=0; i<this.calculatedPageNumbers; i++){
            this.calculatedPageNumberArray.push(i+1);
        }

        this.visiblePageNumbers = [];
        
        var 
        totalPages  = this.calculatedPageNumberArray.length,
        maxBlocks   = totalPages/this.maxVisiblePageNos,
        decimal     = maxBlocks - Math.floor(maxBlocks),
        maxBlocks   = decimal > 0 ? maxBlocks : maxBlocks + 1,
        minPage     = 1,
        maxPage     = minPage + this.maxVisiblePageNos - 1;

        console.log( "currentPageNo = " + this.currentPageNo );

        let isWithinRange = this.currentPageNo >= minPage;
        let counter = 0;

        while( isWithinRange ){
            let nextMinPage   = maxPage + 1;
            let nextMaxPage   = nextMinPage + this.maxVisiblePageNos - 1;
            console.log( "Next minPage = " + minPage );
            console.log( "Next maxPage = " + maxPage );
            isWithinRange    = this.currentPageNo >= nextMinPage;
            if( isWithinRange ){
                minPage = nextMinPage;
                maxPage = nextMaxPage;
            }                   
        }

        console.log( "minPage = " + minPage );
        console.log( "maxPage = " + maxPage );
        
        for (var i = minPage; i <= maxPage; i++) {
            if (this.calculatedPageNumberArray.length >= i)
                this.visiblePageNumbers.push(i);
        }

        console.log( JSON.stringify( this.visiblePageNumbers ) );       
    }

        
    getBootstrapClass(name: string) {
        return 'glyphicon glyphicon-' + name;
    }

    getDatumForHeader(header: HunterTableConfig, row: any) {
        let fieldId = header['headerId']; //history ID
        let value = row[fieldId]; // 49484
    }

    getRowDataId(datum, header) {
        if (datum == null || datum.length == 0) {
            console.log('getRowDataId empty datum argument');
        }
        if (header == null || header.length == 0) {
            console.log('getRowDataId empty header argument');
        }
        return datum[header.dataId]
    }

    onClickButton(funcName: string, dataId: any) {
        console.log(funcName);
        this.handleGridAction.emit([funcName, dataId]);
        this.initializeDataGrid();
    }

    removeOverlay() {
        this.overIsOn = false;
    }

    showOverlay() {      
        this.overIsOn = true;  
        setTimeout(() => {
           this.overIsOn = false;
        }, 1500);
    }

    
    
    showFilterDropdown(){        
        //
    }

    displayNewCreationWidget(){        
        this.createNewAction.emit(this.dataBeanName);
        this.initializeDataGrid();
    }

    goToPageOne(){
        this.currentPageNo = 1;
        this.initializeDataGrid();
    }

    goToPreviousPage(){
        if( this.currentPageNo > 1 ){
            this.currentPageNo--;
        }else{
            this.currentPageNo = 1;
        }
        this.initializeDataGrid();
    }

    goToNextPage(){
        if( this.currentPageNo < this.calculatedPageNumbers ){
            this.currentPageNo++;
        }else{
            this.currentPageNo = this.currentPageNo;
        }        
        this.initializeDataGrid();       
    }

    goToLastPage(){
        this.currentPageNo = this.calculatedPageNumberArray[this.calculatedPageNumberArray.length-1];    
        this.initializeDataGrid();
    }

    getCurrentPageCount(){
        let
        startNo =  ( this.currentPageNo - 1 ) * this.selItemsPerPage + 1,
        endNo   =  startNo + this.visibleHunterTableData.length - 1;
        return startNo + '-' + endNo;
    }


   





}