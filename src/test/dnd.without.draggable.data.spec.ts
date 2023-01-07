import { inject, TestBed, ComponentFixture }
    from '@angular/core/testing';

import { DragDropConfig } from '../lib/dnd.config';
import { DraggableComponent } from '../lib/draggable.component';
import { DroppableComponent } from '../lib/droppable.component';
import { DragDropService } from '../lib/dnd.service';

import { Container, triggerEvent } from './dnd.component.factory';

describe('Drag and Drop without draggable data', () => {

    let componentFixture: ComponentFixture<Container>;
    let dragdropService: DragDropService;
    let config: DragDropConfig;
    let container: Container;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DraggableComponent, DroppableComponent, Container],
            providers: [DragDropConfig, DragDropService]
        });
        TestBed.compileComponents();
    });

    beforeEach(inject([DragDropConfig, DragDropService],
        (c: DragDropConfig, dd: DragDropService) => {
            dragdropService = dd;
            config = c;

            componentFixture = TestBed.createComponent(Container);
            componentFixture.detectChanges();
            container = <Container>componentFixture.componentInstance;
        }));

    it('should be defined', () => {
        expect(componentFixture).toBeDefined();
    });

    it('Drop events should not be activated on the wrong drop-zone', (done: any) => {
        let dragElemOne: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dragIdOne');
        let dropElemTwo: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dropIdTwo');

        triggerEvent(dragElemOne, 'dragstart', 'MouseEvent');
        triggerEvent(dropElemTwo, 'dragenter', 'MouseEvent');
        componentFixture.detectChanges();
        expect(dropElemTwo.classList.contains(config.onDragEnterClass)).toEqual(false);

        triggerEvent(dropElemTwo, 'dragover', 'MouseEvent');
        componentFixture.detectChanges();
        expect(dropElemTwo.classList.contains(config.onDragOverClass)).toEqual(false);

        let dragCount: number = 0, dropCount: number = 0;
        container.dragOne.subscribe(($event: any) => {
            dragCount++;
        }, (error: any) => { }, () => {
            // Here is a function called when stream is complete
            expect(dragCount).toBe(0);
        });

        container.dropTwo.subscribe(($event: any) => {
            dropCount++;
        }, (error: any) => { }, () => {
            // Here is a function called when stream is complete
            expect(dropCount).toBe(0);
        });
        triggerEvent(dropElemTwo, 'drop', 'MouseEvent');
        componentFixture.detectChanges();

        done();
    });

    it('Drop events should be activated on the same drop-zone', (done: any) => {
        let dragElemOne: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dragIdOne');
        let dropElemOne: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dropIdOne');

        triggerEvent(dragElemOne, 'dragstart', 'MouseEvent');
        triggerEvent(dropElemOne, 'dragenter', 'MouseEvent');
        componentFixture.detectChanges();
        expect(dropElemOne.classList.contains(config.onDragEnterClass)).toEqual(true);

        triggerEvent(dropElemOne, 'dragover', 'MouseEvent');
        componentFixture.detectChanges();
        expect(dropElemOne.classList.contains(config.onDragOverClass)).toEqual(true);

        let dragCount: number = 0, dropCount: number = 0;
        container.dragOne.subscribe(($event: any) => {
            dragCount++;
        }, (error: any) => { }, () => {
            // Here is a function called when stream is complete
            expect(dragCount).toBe(1);
        });

        container.dropOne.subscribe(($event: any) => {
            dropCount++;
        }, (error: any) => { }, () => {
            // Here is a function called when stream is complete
            expect(dropCount).toBe(1);
        });
        triggerEvent(dropElemOne, 'drop', 'MouseEvent');
        componentFixture.detectChanges();

        done();
    });

    it('Drop events on multiple drop-zone', (done: any) => {
        let dragElemOneTwo: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dragIdOneTwo');
        let dropElemOneTwo: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dropIdOneTwo');

        triggerEvent(dragElemOneTwo, 'dragstart', 'MouseEvent');
        triggerEvent(dropElemOneTwo, 'dragenter', 'MouseEvent');
        componentFixture.detectChanges();
        expect(dropElemOneTwo.classList.contains(config.onDragEnterClass)).toEqual(true);

        triggerEvent(dropElemOneTwo, 'dragover', 'MouseEvent');
        componentFixture.detectChanges();
        expect(dropElemOneTwo.classList.contains(config.onDragOverClass)).toEqual(true);

        let dragCount: number = 0, dropCount: number = 0;
        container.dragOne.subscribe(($event: any) => {
            dragCount++;
        }, (error: any) => { }, () => {
            // Here is a function called when stream is complete
            expect(dragCount).toBe(1);
        });

        container.dropOne.subscribe(($event: any) => {
            dropCount++;
        }, (error: any) => { }, () => {
            // Here is a function called when stream is complete
            expect(dropCount).toBe(1);
        });
        triggerEvent(dropElemOneTwo, 'drop', 'MouseEvent');
        componentFixture.detectChanges();

        done();
    });

});

