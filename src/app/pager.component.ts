import {Pipe, PipeTransform, Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {NumberToArrayPipe} from './number-to-array.pipe';

@Component({
    moduleId: module.id,
    selector: 'pager',
    template: `
        <nav>
            <ul class="pagination">
                <!-- left arrow -->
                <li [class.disabled]="currentPage==1">
                    <a
                        aria-label="Previous"
                        (click)="prevNext(true)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <!-- numbers -->
                <li
                    *ngFor="let p of numPages | numberToArray; let i = index"
                    [class.active]="i+1==currentPage">
                    <a (click)="pageChange(i)">{{ i+1 }}</a>
                </li>
                <!-- right arrow -->
                <li [class.disabled]="currentPage==numPages">
                    <a
                        aria-label="Next"
                        (click)="prevNext(false)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>
    `,
    pipes: [NumberToArrayPipe]
})

export class PaginationComponent implements OnInit {
    @Input() numPages: number = 5;
    @Input() currentPage: number = 1;
    @Output('page-change') event: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
    }

    prevNext(prev: boolean) {
        if(prev && (this.currentPage == 1)) {
            return;
        }
        if(!prev && (this.currentPage == this.numPages)) {
            return;
        }
        let newPage = prev ? (this.currentPage-1) : (this.currentPage+1);
        this.pageChange(newPage);
    }

    resetPage() {
        this.currentPage = 1;
    }

    pageChange(page: number) {
        this.currentPage = page + 1;
        this.event.emit(page);
    }
}