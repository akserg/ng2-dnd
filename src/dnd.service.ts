// Copyright (C) 2016 Shane Oborn
// This project is licensed under the terms of the MIT license.
// https://github.com/obosha/ng2-dnd

import {Injectable, EventEmitter} from '@angular/core';

import {DragDropConfig} from './dnd.config';
import {isPresent} from './dnd.utils';
import {SortableContainer} from './sortable.component';

export class DragDropData {
    dragData: any;
    mouseEvent: MouseEvent;
}

export function dragDropServiceFactory(): DragDropService  {
    return new DragDropService();
}

@Injectable()
export class DragDropService {
    allowedDropZones: Array<string> = [];
    onDragSuccessCallback: EventEmitter<DragDropData>;
    dragData: any;
    isDragged: boolean;
}

export function dragDropSortableServiceFactory(config: DragDropConfig): DragDropSortableService  {
    return new DragDropSortableService(config);
}

@Injectable()
export class DragDropSortableService {
    index: number;
    sortableContainer: SortableContainer;
    isDragged: boolean;

    private _elem: HTMLElement;
    public get elem(): HTMLElement {
        return this._elem;
    }

    constructor(private _config:DragDropConfig) {}

    markSortable(elem: HTMLElement) {
        if (isPresent(this._elem)) {
            this._elem.classList.remove(this._config.onSortableDragClass);
        }
        if (isPresent(elem)) {
            this._elem = elem;
            this._elem.classList.add(this._config.onSortableDragClass);
        }
    }
}
