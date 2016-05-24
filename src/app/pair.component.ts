import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'pair',
    template: `
        <div *ngIf="para">
            <em class="blue-text">{{ title }}:</em>
            <span [innerHTML]="para"></span>
        </div>
    `,
    styles: [`
        .blue-text {
            color: #158cba;
        }
    `]
})

export class PairComponent implements OnInit {
    // @Input() visible: boolean;
    @Input() title: string;
    @Input() para: string;

    constructor() {}

    ngOnInit() {
        // console.log(this.title, this.para);
    }
}
