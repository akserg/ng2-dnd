// Copyright (C) 2017 Shane Oborn
// This project is licensed under the terms of the MIT license.
// https://github.com/obosha/ng2-dnd

import { NgModule, ModuleWithProviders } from "@angular/core";

import {DragDropConfig} from './src/dnd.config';
import {DragDropService, DragDropSortableService, dragDropServiceFactory, dragDropSortableServiceFactory} from './src/dnd.service';
import {DraggableComponent} from './src/draggable.component';
import {DroppableComponent} from './src/droppable.component';
import {SortableContainer, SortableComponent} from './src/sortable.component';

export * from './src/abstract.component';
export * from './src/dnd.config';
export * from './src/dnd.service';
export * from './src/draggable.component';
export * from './src/droppable.component';
export * from './src/sortable.component';

export let providers = [
    DragDropConfig,
    { provide: DragDropService, useFactory: dragDropServiceFactory },
    { provide: DragDropSortableService, useFactory: dragDropSortableServiceFactory, deps: [DragDropConfig] }
];

@NgModule({
  declarations: [DraggableComponent, DroppableComponent, SortableContainer, SortableComponent],
  exports : [DraggableComponent, DroppableComponent, SortableContainer, SortableComponent],

})
export class DndModule {
  static forRoot(): ModuleWithProviders {
        return {
            ngModule: DndModule,
            providers: providers
        };
    }
}