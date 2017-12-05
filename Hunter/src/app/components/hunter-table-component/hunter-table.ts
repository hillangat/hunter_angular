import { HunterTableConfig } from './../../beans/hunter-table-configs';
import { Component, Input, Output, OnInit, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { taskHistory } from '../../data/mocked-task-history';


@Component({
    moduleId: module.id,
    selector: 'app-hunter-table',
    templateUrl: 'hunter-table.html',
    styleUrls: ['hunter-table.css']
})
export class HunterTableComponent implements OnInit {

    @Output() handleGridAction = new EventEmitter<any[]>();
    @Output() createNewAction = new EventEmitter<string>();

    @Input ('headers') headers: any[];
    @Input('hunterTableData') hunterTableData: any[];
    @Input('dataBeanName') dataBeanName = 'Record';

    @ViewChild('closePopupButton') closePopupButton: ElementRef;

    private visibleHunterTableData: any[];
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

    constructor( private ref: ElementRef ) {
        console.log( 'Starting it up...' );
    }

    public ngOnInit() {
        this.initializeDataGrid();
    }

    public initializeDataGrid() {
        this.calculatePageNumbers();
        this.redrawBubblePages();
        this.updateVisibleHunterTableData();
        console.log( 'Table initialized!!!' );
    }

    calculatePageNumbers() {

        this.totalRowNum = this.hunterTableData.length;

        /** If the user selects 'All', then the page number is equal to 1 */
        if ( this.selItemsPerPage === 0 ) {
            this.calculatedPageNumbers = 1;
            console.log( this.calculatedPageNumbers );
            this.redrawBubblePages();
            return;
        }
        if ( this.selItemsPerPage >= this.totalRowNum ) {
            this.calculatedPageNumbers = 1;
            this.redrawBubblePages();
            return;
        }

        /** If there is a decimal, the page no is +1 */
        let pageNo  = this.totalRowNum / this.selItemsPerPage; // 8 divide by 2 = 4
        const decimal = pageNo - Math.floor(pageNo);
        this.calculatedPageNumbers = decimal >= 0 ? ( pageNo ++) : pageNo;

        /** There has gotta be at least one page */
        this.calculatedPageNumbers = this.calculatedPageNumbers < 1 ? 1 : this.calculatedPageNumbers;
    }

    setItemsPerPage( _selItemsPerPage ) {
        this.selItemsPerPage = _selItemsPerPage;
        this.displaySelItemsPerPage = _selItemsPerPage === 0 ? 'All' : _selItemsPerPage + '';
        this.currentPageNo = 1;
        this.initializeDataGrid();
    }

    updateVisibleHunterTableData() {

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

    getStyleForSelPageCircle( pageNo ) {
        return this.currentPageNo === pageNo ? '#D6F0F2' : '';
    }

    setCurrentPage( selPageNo ) {
        this.currentPageNo = selPageNo;
        // this.updateVisibleHunterTableData();
        this.initializeDataGrid();
    }

    redrawBubblePages() {

        this.calculatedPageNumberArray = [];

        for ( let i = 0; i < this.calculatedPageNumbers; i++) {
            this.calculatedPageNumberArray.push( i + 1 );
        }

        this.visiblePageNumbers = [];

        const totalPages  = this.calculatedPageNumberArray.length;
        let maxBlocks   = totalPages / this.maxVisiblePageNos;
        const decimal     = maxBlocks - Math.floor(maxBlocks);
        maxBlocks   = decimal > 0 ? maxBlocks : maxBlocks + 1;
        let minPage     = 1,
        maxPage     = minPage + this.maxVisiblePageNos - 1;

        console.log( 'currentPageNo = ' + this.currentPageNo );

        let isWithinRange = this.currentPageNo >= minPage;
        const counter = 0;

        while ( isWithinRange ) {
            const nextMinPage   = maxPage + 1;
            const nextMaxPage   = nextMinPage + this.maxVisiblePageNos - 1;
            console.log( 'Next minPage = ' + minPage );
            console.log( 'Next maxPage = ' + maxPage );
            isWithinRange    = this.currentPageNo >= nextMinPage;
            if ( isWithinRange ) {
                minPage = nextMinPage;
                maxPage = nextMaxPage;
            }
        }

        console.log( 'minPage = ' + minPage );
        console.log( 'maxPage = ' + maxPage );

        for ( let i = minPage; i <= maxPage; i++) {
            if (this.calculatedPageNumberArray.length >= i) {
                this.visiblePageNumbers.push(i);
            }
        }

        console.log( JSON.stringify( this.visiblePageNumbers ) );
    }

    getBootstrapClass(name: string) {
        return 'glyphicon glyphicon-' + name;
    }

    getDatumForHeader( header: HunterTableConfig, row: any) {
        const fieldId = header['headerId']; // history ID
        const value = row[fieldId]; // 49484
    }

    getRowDataId(datum, header) {
        if (datum == null || datum.length === 0) {
            console.log('getRowDataId empty datum argument');
        }
        if (header == null || header.length === 0) {
            console.log('getRowDataId empty header argument');
        }
        return datum[header.dataId]
    }

    onClickButton(funcName: string, dataId: any) {
        this.handleGridAction.emit([funcName, dataId]);
        this.initializeDataGrid();
    }

    removeOverlay() {
        this.overlayIsOn = false;
    }

    showOverlay() {
        this.overlayIsOn = true;
        this.onClickButton( 'refresh', -1 );
    }

    showFilterDropdown() {
        //
    }

    displayNewCreationWidget() {
        this.createNewAction.emit(this.dataBeanName);
        this.initializeDataGrid();
    }

    goToPageOne() {
        this.currentPageNo = 1;
        this.initializeDataGrid();
    }

    goToPreviousPage() {
        if ( this.currentPageNo > 1 ) {
            this.currentPageNo--;
        } else {
            this.currentPageNo = 1;
        }
        this.initializeDataGrid();
    }

    goToNextPage() {
        if ( this.currentPageNo < this.calculatedPageNumbers ) {
            this.currentPageNo++;
        } else {
            this.currentPageNo = this.currentPageNo;
        }
        this.initializeDataGrid();
    }

    goToLastPage() {
        this.currentPageNo = this.calculatedPageNumberArray[this.calculatedPageNumberArray.length - 1];
        this.initializeDataGrid();
    }

    getCurrentPageCount() {
        const
        startNo =  ( this.currentPageNo - 1 ) * this.selItemsPerPage + 1,
        endNo   =  startNo + this.visibleHunterTableData.length - 1;
        return startNo + '-' + endNo;
    }

    public filterAndClosePopup() {
        this.closePopupButton.nativeElement.click();
    }

    public onFilterDropdownHidden(): void {
        console.log('Dropdown is hidden');
    }
    public onShown(): void {
        console.log('Dropdown is shown');
    }
    public isOpenChange(): void {
        console.log('Dropdown state is changed');
    }


}
