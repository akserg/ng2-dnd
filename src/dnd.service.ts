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

export function dragDropServiceFactory(): DragDropService {
    return new DragDropService();
}

@Injectable()
export class DragDropService {
    allowedDropZones: Array<string> = [];
    onDragSuccessCallback: EventEmitter<DragDropData>;
    dragData: any;
    isDragged: boolean;
}

export function dragDropSortableServiceFactory(config: DragDropConfig, renderer: Renderer2): DragDropSortableService {
    return new DragDropSortableService(config, renderer);
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

    constructor(private _config: DragDropConfig, private renderer: Renderer2) { }

    markSortable(elem: HTMLElement) {
        if (isPresent(this._elem)) {
            this.renderer.removeClass(this._elem, this._config.onSortableDragClass);
        }
        if (isPresent(elem)) {
            this._elem = elem;
            this.renderer.addClass(this._elem, this._config.onSortableDragClass);
        }
    }
}
