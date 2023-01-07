// Copyright (C) 2016-2020 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import { NgModule, ModuleWithProviders } from "@angular/core";

import { DragDropConfig } from './dnd.config';
import { DragDropSortableService } from './dnd.service';
import { DraggableComponent, DraggableHandleComponent } from './draggable.component';
import { DroppableComponent } from './droppable.component';
import { SortableContainer, SortableComponent, SortableHandleComponent } from './sortable.component';

@NgModule({
    declarations: [
        DraggableComponent,
        DraggableHandleComponent,
        DroppableComponent,
        SortableContainer,
        SortableComponent,
        SortableHandleComponent
    ],
    exports: [
        DraggableComponent,
        DraggableHandleComponent,
        DroppableComponent,
        SortableContainer,
        SortableComponent,
        SortableHandleComponent
    ],
})
export class DndModule {
    static forRoot(config: DragDropConfig = null): ModuleWithProviders<DndModule> {
        return {
            ngModule: DndModule,
            providers: [
                {
                    provide: DragDropConfig,
                    useValue: config || new DragDropConfig()
                },
                DragDropSortableService
            ]
        };
    }
}
