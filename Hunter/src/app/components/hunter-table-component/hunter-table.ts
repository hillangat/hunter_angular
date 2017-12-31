import { OverlayService } from './../../services/overlay-service';
import { HunterServerResponse } from './../../beans/ServerResponse';
import { Component, Input, Output, OnInit, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { taskHistory } from '../../data/mocked-task-history';
import { LoggerService } from '../../common/logger.service';
import BarAction from 'app/components/hunter-table-component/shared/BarAction';
import { ServerStatuses } from '../../beans/server-status-response';
import { OverlayComponent } from '../overlay/overlay.component';
import Utility from '../../utilities/Utility';
import { HunterTableConfig } from '../../beans/hunter-table-configs';
import { HunterTableSelItem } from '../../beans/HunterTableSelItem';
import { SelField } from '../../beans/SelField';


@Component({
    moduleId: module.id,
    selector: 'app-hunter-table',
    templateUrl: './hunter-table.html',
    styleUrls: ['./hunter-table.css']
})
export class HunterTableComponent implements OnInit {

    /**
     * Note: this is for exportingh to excel using jQuery
     * http://www.jquerybyexample.net/2012/10/export-table-data-to-excel-using-jquery.html
     */
    public allSelHeaders: string[] = [];

    @Output() handleGridAction = new EventEmitter<any[]>();
    @Output() handleBarAction = new EventEmitter<BarAction>();
    @Output() reloadData = new EventEmitter<void>();
    @Output() selectedItems = new EventEmitter<HunterTableSelItem[]>();

    @Input ('pageSize') pageSize: number;
    @Input ('barActions') barActions: BarAction[] = [];
    @Input ('height') height = 0;
    @Input ('headers') headers: any[];
    @Input('hunterTableData') hunterTableData: any[] = [];
    @Input('serverResponse') serverResponse: HunterServerResponse;

    @ViewChild('closePopupButton') closePopupButton: ElementRef;
    @ViewChild('hunterTableOveraly') hunterTableOveraly: OverlayComponent;

    private _loadingData = false;
    private visibleHunterTableData: any[] = [];
    private overlayIsOn = false;
    private hasNewRowButton = true;
    private calculatedPageNumbers = 0;
    private calculatedPageNumberArray: number[] = [];
    public items: string[] = ['The first choice!', 'And another choice for you.', 'but wait! A third!' ];
    private visiblePageNumbers: number[] = [];
    private itemsPerPage: number[] = [ 4, 5, 20, 50, 100, 200, 500 ];
    private displaySelItemsPerPage: string = this.itemsPerPage[0] + '';
    private selItemsPerPage: number = this.itemsPerPage[0];
    private maxVisiblePageNos = 3;
    private totalRowNum = 0;
    private currentPageNo = 1;
    private startIndex = 0 ;
    private endIndex = 0;
    private currSelItems: HunterTableSelItem[] = [];

    constructor(
        private ref: ElementRef,
        private logger: LoggerService,
        private overlayService: OverlayService
    ) {
        this.logger.log( 'Starting it up...' );
    }

    @Input('loadingData') public set loadingData ( loadingData: boolean  ) {
        this._loadingData = loadingData;
        if ( !this._loadingData ) {
            this.initializeDataGrid();
        }
    };

    public get loadingData(): boolean {
        return this._loadingData;
    }

    public isAllSel( header: HunterTableConfig ): boolean {
        return this.allSelHeaders.find( (headerKey: string) => headerKey === header.headerId ) !== null;
    }

    public ngOnInit() {
        this.setDefaults();
        this.initializeDataGrid();
    }

    public openCloseOverlay() {
        this.overlayService.openCloseOverlay( { wholeScreen: true, message: 'Loading Data. Please wait...' } );
    }

    public setDefaults(): void {
        if ( this.serverResponse && this.serverResponse.status === 'Success' ) {
            this.hunterTableData = this.serverResponse.data;
            this.headers = this.serverResponse.headers;
        }
        this.retrieveSelItems();
        this.selItemsPerPage = this.pageSize ? this.pageSize : this.itemsPerPage[0];
        this.height = this.height === 0 ? this.height = 400 : this.height;
    }


    /**
     * if there is a checkbox for specific column
     * [
        {
            "dataId": 1,
            "selFields": [
            {
                "header": "groupId",
                "selected": true
            }
            ]
        }
        ]
    */
    public retrieveSelItems() {
        if ( Utility.isNotEmpty( this.headers ) ) {
            const  checkboxes: HunterTableConfig[] = this.headers.filter(  (header: HunterTableConfig) => header.checkBox );
            if ( Utility.isNotEmpty( checkboxes ) && Utility.isNotEmpty( this.hunterTableData ) ) {
                const selItems: HunterTableSelItem[] = [];
                checkboxes.forEach( ( header: HunterTableConfig ) => {
                    this.hunterTableData.forEach( datum => {

                        // dataId and headerId are mostly the same.
                        const dataIdKey: string  = Object.keys(datum).filter( (k: string) => k === header.dataId )[0];
                        const headerId: string = Object.keys(datum).filter( (k: string) => k === header.headerId )[0];
                        const dataId: any = datum[dataIdKey];

                        const prevSels: HunterTableSelItem[] = selItems.filter(
                            ( selItem: HunterTableSelItem ) => selItem.dataId ===  selItem.dataId === dataId
                        );

                        const prevSel: boolean = prevSels.length > 0;

                        const selItem: HunterTableSelItem = Utility.isNotEmpty( prevSels ) ? prevSels[0] : new HunterTableSelItem();
                        selItem.dataId = datum[dataIdKey];
                        selItem.selFields = Utility.isNotEmpty( selItem.selFields ) ? selItem.selFields : [];
                        selItem.selFields.push( { header: headerId, selected: false } );
                        selItem.dataId = datum[header.headerId];

                        if ( !prevSel ) {
                            selItems.push( selItem );
                        }

                    });
                });
                this.currSelItems = selItems;
                this.logger.log( 'Initial selected items: ' + JSON.stringify( this.currSelItems ) );
            }
        }
    }

    public isRowFieldSel( datum: any, header: HunterTableConfig ): boolean {
        const sels: HunterTableSelItem[] = this.currSelItems.filter(
            ( selItem: HunterTableSelItem ) => selItem.dataId === datum[header.dataId]
        );
        if ( Utility.isNotEmpty( sels ) ) {
            const firstItem: HunterTableSelItem = sels[0];
            const selFields: SelField[] = firstItem.selFields.filter(
                (selField: SelField) => selField.header === header.headerId && selField.selected
            );
            return Utility.isNotEmpty( selFields );
        }
        return false;
    }

    public refreshGrid( serverResponse: HunterServerResponse ): void {
        alert( 'refreshing!' );
        this.serverResponse = serverResponse;
        this.ngOnInit();
    }

    public initializeDataGrid() {
        this.calculatePageNumbers();
        this.redrawBubblePages();
        this.updateVisibleHunterTableData();
        this.logger.log( 'Table initialized!!!' );
    }

    public selectAll() {
        this.selectedItems.emit( this.visibleHunterTableData );
    }

    public saveSelField( datum: any, header: HunterTableConfig ) {
        this.logger.log( JSON.stringify( this.currSelItems ) );
        const selIItem: HunterTableSelItem = this.currSelItems.find( ( sel: HunterTableSelItem ) => sel.dataId === datum[header.dataId] );
        const selField = selIItem.selFields.find( (field: SelField) => field.header === header.headerId );
        selField.selected = !selField.selected;
        this.selectedItems.emit( this.currSelItems );
    }

    public calculatePageNumbers() {

        this.totalRowNum = this.hunterTableData.length;

        /** If the user selects 'All', then the page number is equal to 1 */
        if ( this.selItemsPerPage === 0 ) {
            this.calculatedPageNumbers = 1;
            this.logger.log( JSON.stringify( this.calculatedPageNumbers ) );
            this.redrawBubblePages();
            return;
        }
        if ( this.selItemsPerPage >= this.totalRowNum ) {
            this.calculatedPageNumbers = 1;
            return;
        }

        /** If there is a decimal, the page no is +1 */
        let pageNo  = this.totalRowNum / this.selItemsPerPage; // 8 divide by 2 = 4
        const decimal = pageNo - Math.floor(pageNo);
        this.calculatedPageNumbers = decimal >= 0 ? ( pageNo ++) : pageNo;

        /** There has gotta be at least one page */
        this.calculatedPageNumbers = this.calculatedPageNumbers < 1 ? 1 : this.calculatedPageNumbers;
    }

    public setItemsPerPage( _selItemsPerPage ) {
        this.selItemsPerPage = _selItemsPerPage;
        this.displaySelItemsPerPage = _selItemsPerPage === 0 ? 'All' : _selItemsPerPage + '';
        this.currentPageNo = 1;
        this.initializeDataGrid();
    }

    public updateVisibleHunterTableData() {

        if ( this.calculatedPageNumbers === 1 ) {
            this.startIndex = 0;
            this.endIndex =  this.hunterTableData.length - 1;
            this.visibleHunterTableData = this.hunterTableData;
            this.startIndex = 0;
            this.endIndex = this.hunterTableData.length;
            return;
        }

        this.visibleHunterTableData = [];

        this.startIndex = ((this.currentPageNo - 1) * this.selItemsPerPage);
        this.endIndex   = this.startIndex + this.selItemsPerPage;

        for ( let i = this.startIndex; i < this.endIndex; i ++ ) {
            if ( this.hunterTableData.length > i ) {
                this.visibleHunterTableData.push(this.hunterTableData[i]);
            } else {
                break;
            }
        }
    }

    public getStyleForSelPageCircle( pageNo ) {
        return this.currentPageNo === pageNo ? '#D6F0F2' : '';
    }

    public setCurrentPage( selPageNo ) {
        this.currentPageNo = selPageNo;
        // this.updateVisibleHunterTableData();
        this.initializeDataGrid();
    }

    public redrawBubblePages() {

        this.calculatedPageNumberArray = [];

        for ( let i = 0; i < this.calculatedPageNumbers; i++) {
            this.calculatedPageNumberArray.push( i + 1 );
        }

        this.visiblePageNumbers = [];

        const totalPages    = this.calculatedPageNumberArray.length;
        let maxBlocks       = totalPages / this.maxVisiblePageNos;
        const decimal       = maxBlocks - Math.floor(maxBlocks);
        maxBlocks       = decimal > 0 ? maxBlocks : maxBlocks + 1;
        let minPage     = 1,
        maxPage     = minPage + this.maxVisiblePageNos - 1;

        this.logger.log( 'currentPageNo = ' + this.currentPageNo );

        let isWithinRange = this.currentPageNo >= minPage;
        const counter = 0;

        while ( isWithinRange ) {
            const nextMinPage   = maxPage + 1;
            const nextMaxPage   = nextMinPage + this.maxVisiblePageNos - 1;
            this.logger.log( 'Next minPage = ' + minPage );
            this.logger.log( 'Next maxPage = ' + maxPage );
            isWithinRange    = this.currentPageNo >= nextMinPage;
            if ( isWithinRange ) {
                minPage = nextMinPage;
                maxPage = nextMaxPage;
            }
        }

        this.logger.log( 'minPage = ' + minPage );
        this.logger.log( 'maxPage = ' + maxPage );

        for ( let i = minPage; i <= maxPage; i++) {
            if (this.calculatedPageNumberArray.length >= i) {
                this.visiblePageNumbers.push(i);
            }
        }

        this.logger.log( JSON.stringify( this.visiblePageNumbers ) );
    }

    public getBootstrapClass(name: string) {
        return 'glyphicon glyphicon-' + name;
    }

    public getDatumForHeader( header: HunterTableConfig, row: any) {
        const fieldId = header['headerId']; // history ID
        const value = row[fieldId]; // 49484
    }

    public getRowDataId(datum, header) {
        if (datum == null || datum.length === 0) {
            this.logger.log('getRowDataId empty datum argument');
        }
        if (header == null || header.length === 0) {
            this.logger.log('getRowDataId empty header argument');
        }
        return datum[header.dataId]
    }

    public onClickButton(funcName: string, dataId: any, datum) {
        this.handleGridAction.emit([funcName, dataId, datum]);
        this.initializeDataGrid();
    }

    public onClickBarAction( action: BarAction ) {
        this.handleBarAction.emit( action );
    }

    public removeOverlay() {
        this.overlayIsOn = false;
    }

    public showOverlay() {
        this.overlayIsOn = true;
        this.onClickButton( 'refresh', -1, null );
    }

    public refresh(): void {
        this.loadingData = true;
        this.reloadData.emit();
    }

    public showFilterDropdown() {
        //
    }

    public goToPageOne() {
        this.currentPageNo = 1;
        this.initializeDataGrid();
    }

    public goToPreviousPage() {
        if ( this.currentPageNo > 1 ) {
            this.currentPageNo--;
        } else {
            this.currentPageNo = 1;
        }
        this.initializeDataGrid();
    }

    public goToNextPage() {
        if ( this.currentPageNo < this.calculatedPageNumbers ) {
            this.currentPageNo++;
        } else {
            this.currentPageNo = this.currentPageNo;
        }
        this.initializeDataGrid();
    }

    public goToLastPage() {
        this.currentPageNo = this.calculatedPageNumberArray[this.calculatedPageNumberArray.length - 1];
        this.initializeDataGrid();
    }

    public getCurrentPageCount() {
        const
        startNo =  ( this.currentPageNo - 1 ) * this.selItemsPerPage + 1,
        endNo   =  startNo + this.visibleHunterTableData.length - 1;
        return startNo + '-' + endNo;
    }

    public filterAndClosePopup() {
        this.closePopupButton.nativeElement.click();
    }

    public getDateNumFormat( numb: number ): string {
        return Utility.getFormatedFromNumber( numb );
    }

    public onFilterDropdownHidden(): void {
        this.logger.log('Dropdown is hidden');
    }
    public onShown(): void {
        this.logger.log('Dropdown is shown');
    }
    public isOpenChange(): void {
        this.logger.log('Dropdown state is changed');
    }


}

