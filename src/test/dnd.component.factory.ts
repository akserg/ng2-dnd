import { Component, Input, Output, EventEmitter } from '@angular/core';

export function triggerEvent(elem: HTMLElement, eventName: string, eventType: string) {
    var event: Event = document.createEvent(eventType);
    event.initEvent(eventName, true, true);
    elem.dispatchEvent(event);
}

@Component({
    selector: 'test-container',
    template: `
<div id='dragIdOne' dnd-draggable [dropZones]="['zone-one']" (onDragSuccess)="dragOneSuccessCallback($event)"></div>
<div id='dragIdTwo' dnd-draggable [dropZones]="['zone-two']" (onDragSuccess)="dragTwoSuccessCallback($event)"></div>
<div id='dragIdOneTwo' dnd-draggable [dropZones]="['zone-one', 'zone-two']" (onDragSuccess)="dragOneTwoSuccessCallback($event)"></div>

<div id='dropIdOne' dnd-droppable [dropZones]="['zone-one']" (onDropSuccess)="dropOneSuccessCallback($event)"></div>
<div id='dropIdTwo' dnd-droppable [dropZones]="['zone-two']" (onDropSuccess)="dropTwoSuccessCallback($event)"></div>
<div id='dropIdOneTwo' dnd-droppable [dropZones]="['zone-one', 'zone-two']" (onDropSuccess)="dropOneTwoSuccessCallback($event)"></div>
`
})
export class Container {
    @Output() dragOne: EventEmitter<any> = new EventEmitter<any>();
    @Output() dragTwo: EventEmitter<any> = new EventEmitter<any>();
    @Output() dragOneTwo: EventEmitter<any> = new EventEmitter<any>();

    @Output() dropOne: EventEmitter<any> = new EventEmitter<any>();
    @Output() dropTwo: EventEmitter<any> = new EventEmitter<any>();
    @Output() dropOneTwo: EventEmitter<any> = new EventEmitter<any>();

    // tslint:disable-next-line
    private dragOneSuccessCallback($event: any) {
        this.dragOne.emit($event);
    }

    // tslint:disable-next-line
    private dragTwoSuccessCallback($event: any) {
        this.dragOne.emit($event);
    }

    // tslint:disable-next-line
    private dragOneTwoSuccessCallback($event: any) {
        this.dragOneTwo.emit($event);
    }

    // tslint:disable-next-line
    private dropOneSuccessCallback($event: any) {
        this.dropOne.emit($event);
    }

    // tslint:disable-next-line
    private dropTwoSuccessCallback($event: any) {
        this.dropTwo.emit($event);
    }

    // tslint:disable-next-line
    private dropOneTwoSuccessCallback($event: any) {
        this.dropOneTwo.emit($event);
    }
}

@Component({
    selector: 'test-container-two',
    template: `
<div id='dragId' dnd-draggable [dragEnabled]="dragEnabled" [dragData]="dragData" [dropZones]="['test1']" (onDragSuccess)="dragSuccessCallback($event)"></div>
<div id='dropId' dnd-droppable [dropZones]="['test1']" (onDropSuccess)="dropSuccessCallback($event)"></div>
`
})
export class Container2 {
    @Input() dragEnabled: boolean = true;
    @Input() dragData: any = "Hello World at " + new Date().toString();

    @Output() drag: EventEmitter<any> = new EventEmitter<any>();
    @Output() drop: EventEmitter<any> = new EventEmitter<any>();

    // tslint:disable-next-line
    private dragSuccessCallback($event: any) {
        this.drag.emit($event);
    }

    // tslint:disable-next-line
    private dropSuccessCallback($event: any) {
        this.drop.emit($event);
    }
}

@Component({
    selector: 'test-container-three',
    template: `
<div>
    <ul class="list-group" dnd-sortable-container [sortableData]="sortableList">
        <li *ngFor="let item of sortableList; let i = index" dnd-sortable [sortableIndex]="i">{{item}}</li>
    </ul>
</div>
`
})
export class Container3 {
    @Input() sortableList: Array<string> = [];
}

@Component({
    selector: 'test-container-four',
    template: `
<div>
    <div id='single'>
        <ul class="list-group" dnd-sortable-container [sortableData]="singleList">
            <li *ngFor="let item of singleList; let i = index" dnd-sortable [sortableIndex]="i">{{item}}</li>
        </ul>
    </div>
    <div id='multiOne' dnd-sortable-container [dropZones]="['multiList']" [sortableData]="multiOneList">
        <ul class="list-group" >
            <li *ngFor="let item of multiOneList; let i = index" dnd-sortable [sortableIndex]="i">{{item}}</li>
        </ul>
    </div>
    <div id='multiTwo' dnd-sortable-container [dropZones]="['multiList']" [sortableData]="multiTwoList">
        <ul class="list-group" >
            <li *ngFor="let item of multiTwoList; let i = index" dnd-sortable [sortableIndex]="i">{{item}}</li>
        </ul>
    </div>
</div>
`
})
export class Container4 {
    @Input() singleList: Array<string> = [];
    @Input() multiOneList: Array<string> = [];
    @Input() multiTwoList: Array<string> = [];
}

@Component({
    selector: 'test-container-five',
    template: `
<div id='dragId' dnd-draggable [dragEnabled]="dragEnabled" [dragData]="dragData" [dropZones]="['test1']" (onDragSuccess)="dragSuccessCallback($event)">
    <span id="handle" dnd-draggable-handle>=</span>
    <span id="non-handle">Not handle</span>
</div>
<div id='dropId' dnd-droppable [dropZones]="['test1']" (onDropSuccess)="dropSuccessCallback($event)"></div>
`
})
export class Container5 {
    @Input() dragEnabled: boolean = true;
    @Input() dragData: any = "Hello World at " + new Date().toString();

    @Output() drag: EventEmitter<any> = new EventEmitter<any>();
    @Output() drop: EventEmitter<any> = new EventEmitter<any>();

    // tslint:disable-next-line
    private dragSuccessCallback($event: any) {
        this.drag.emit($event);
    }

    // tslint:disable-next-line
    private dropSuccessCallback($event: any) {
        this.drop.emit($event);
    }
}

@Component({
    selector: 'test-container-six',
    template: `
<div>
    <ul class="list-group" dnd-sortable-container [sortableData]="sortableList">
        <li *ngFor="let item of sortableList; let i = index" dnd-sortable [sortableIndex]="i">
        <span class="handle" dnd-sortable-handle>=</span>
        <span class="non-handle">{{item}}</span>
        </li>
    </ul>
</div>
`
})
export class Container6 {
    @Input() sortableList: Array<string> = [];
}
