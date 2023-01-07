import { inject, TestBed, ComponentFixture }
    from '@angular/core/testing';

import { DragDropConfig } from '../lib/dnd.config';
import { DraggableComponent, DraggableHandleComponent } from '../lib/draggable.component';
import { DroppableComponent } from '../lib/droppable.component';
import { DragDropService } from '../lib/dnd.service';

import { Container5, triggerEvent } from './dnd.component.factory';

describe('Drag and Drop with handle', () => {

    let componentFixture: ComponentFixture<Container5>;
    let dragdropService: DragDropService;
    let config: DragDropConfig;
    let container: Container5;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DraggableComponent, DroppableComponent, DraggableHandleComponent, Container5],
            providers: [DragDropConfig, DragDropService]
        });
        TestBed.compileComponents();
    });

    beforeEach(inject([DragDropConfig, DragDropService],
        (c: DragDropConfig, dd: DragDropService) => {
            dragdropService = dd;
            config = c;

            componentFixture = TestBed.createComponent(Container5);
            componentFixture.detectChanges();
            container = <Container5>componentFixture.componentInstance;
        }));

    it('should be defined', () => {
        expect(componentFixture).toBeDefined();
    });

    it('Drag start event should be activated if dragged by handle', (done: any) => {
        let dragElem: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dragId');
        let handleElem: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#handle');

        expect(dragdropService.dragData).not.toBeDefined();

        triggerEvent(handleElem, 'mousedown', 'MouseEvent');
        triggerEvent(dragElem, 'dragstart', 'MouseEvent');
        componentFixture.detectChanges();
        expect(dragdropService.dragData).toBeDefined();

        triggerEvent(dragElem, 'dragend', 'MouseEvent');
        triggerEvent(handleElem, 'mouseup', 'MouseEvent');
        componentFixture.detectChanges();
        expect(dragdropService.dragData).toBeNull();

        done();
    });

    it('Drag start event should not be activated if dragged not by handle', (done: any) => {
        container.dragEnabled = false;
        componentFixture.detectChanges();

        let dragElem: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#dragId');
        let nonHandleElem: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('#non-handle');

        expect(dragdropService.dragData).not.toBeDefined();
        expect(dragElem.classList.contains(config.onDragStartClass)).toEqual(false);

        triggerEvent(nonHandleElem, 'mousedown', 'MouseEvent');
        triggerEvent(dragElem, 'dragstart', 'MouseEvent');
        componentFixture.detectChanges();
        expect(dragdropService.dragData).not.toBeDefined();
        expect(dragElem.classList.contains(config.onDragStartClass)).toEqual(false);

        done();
    });
});
