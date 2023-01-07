// Copyright (C) 2016-2020 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import { Injectable, EventEmitter, Renderer2 } from '@angular/core';

import { DragDropConfig } from './dnd.config';
import { isPresent } from './dnd.utils';
import { SortableContainer } from './sortable.component';

export class DragDropData {
    dragData: any;
    mouseEvent: MouseEvent;
}

@Injectable({
    providedIn: 'root'
})
export class DragDropService {
    allowedDropZones: Array<string> = [];
    onDragSuccessCallback: EventEmitter<DragDropData>;
    dragData: any;
    isDragged: boolean;
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

    constructor(private _config: DragDropConfig) {
    }

    markSortable(elem: HTMLElement, renderer: Renderer2) {
        if (isPresent(this._elem)) {
            renderer.removeClass(this._elem, this._config.onSortableDragClass);
        }
        if (isPresent(elem)) {
            this._elem = elem;
            renderer.addClass(this._elem, this._config.onSortableDragClass);
        }
    }
}
