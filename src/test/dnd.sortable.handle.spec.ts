import { inject, TestBed, ComponentFixture }
    from '@angular/core/testing';

import { DragDropConfig } from '../lib/dnd.config';
import { SortableContainer, SortableComponent, SortableHandleComponent } from '../lib/sortable.component';
import { DragDropService, DragDropSortableService } from '../lib/dnd.service';

import { Container6, triggerEvent } from './dnd.component.factory';
import { Renderer2 } from '@angular/core';

describe('Sortable Drag and Drop with handle', () => {

    let componentFixture: ComponentFixture<Container6>;
    let dragdropService: DragDropService;
    let config: DragDropConfig;
    let container: Container6;
    let sortableService: DragDropSortableService;
    const rendererMock = jasmine.createSpyObj('rendererMock', ['addClass', 'removeClass']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [SortableContainer, SortableComponent, SortableHandleComponent, Container6],
            providers: [
                DragDropConfig,
                DragDropService,
                DragDropSortableService,
                { provide: Renderer2, useValue: rendererMock }
            ]
        });
        TestBed.compileComponents();
    });

    beforeEach(inject([DragDropConfig, DragDropService, DragDropSortableService, Renderer2],
        (c: DragDropConfig, dd: DragDropService, ds: DragDropSortableService) => {
            dragdropService = dd;
            config = c;
            sortableService = ds;

            componentFixture = TestBed.createComponent(Container6);
            componentFixture.detectChanges();
            container = <Container6>componentFixture.componentInstance;
        }));

    it('should be defined', () => {
        expect(componentFixture).toBeDefined();
    });

    it('The elements of the list should be draggable by handle', () => {
        let values: Array<string> = ['one', 'two', 'three', 'four'];

        container.sortableList = values;
        componentFixture.detectChanges();

        let ulElem: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('ul');

        expect(ulElem).toBeDefined();
        expect(ulElem.children.length).toBe(values.length);

        expect(sortableService.sortableContainer).not.toBeDefined();
        expect(sortableService.index).not.toBeDefined();

        triggerEvent(<HTMLElement>ulElem.children[0].querySelector('.handle'), 'mousedown', 'MouseEvent');
        triggerEvent(<HTMLElement>ulElem.children[0], 'dragstart', 'MouseEvent');
        componentFixture.detectChanges();
        expect(sortableService.sortableContainer.sortableData).toBe(values);
        expect(sortableService.index).toBe(0);
    });

    it('The elements of the list should not be draggable by non-handle', () => {
        let values: Array<string> = ['one', 'two', 'three', 'four'];

        container.sortableList = values;
        componentFixture.detectChanges();

        let ulElem: HTMLElement = componentFixture.elementRef.nativeElement.querySelector('ul');

        expect(ulElem).toBeDefined();
        expect(ulElem.children.length).toBe(values.length);

        expect(sortableService.sortableContainer).not.toBeDefined();
        expect(sortableService.index).not.toBeDefined();

        triggerEvent(<HTMLElement>ulElem.children[0].querySelector('.non-handle'), 'mousedown', 'MouseEvent');
        triggerEvent(<HTMLElement>ulElem.children[0], 'dragstart', 'MouseEvent');
        componentFixture.detectChanges();
        expect(sortableService.sortableContainer).not.toBeDefined();
        expect(sortableService.index).not.toBeDefined();
    });
});

