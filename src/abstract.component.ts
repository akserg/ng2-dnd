// Copyright (C) 2016-2018 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable, ChangeDetectorRef, ViewRef} from '@angular/core';
import {ElementRef} from '@angular/core';

import { DragDropConfig, DragImage } from './dnd.config';
import { DragDropService } from './dnd.service';
import { isString, isFunction, isPresent, createImage, callFun } from './dnd.utils';

@Injectable()
export abstract class AbstractComponent {
    _elem: HTMLElement;
    _dragHandle: HTMLElement;
    _dragHelper: HTMLElement;
    _defaultCursor: string;

    /**
     * Last element that was mousedown'ed
     */
    _target: EventTarget;

    /**
     * Whether the object is draggable. Default is true.
     */
    private _dragEnabled: boolean = false;
    set dragEnabled(enabled: boolean) {
        this._dragEnabled = !!enabled;
        this._elem.draggable = this._dragEnabled;
    }
    get dragEnabled(): boolean {
        return this._dragEnabled;
    }

    /**
     * Allows drop on this element
     */
    dropEnabled: boolean = false;
    /**
     * Drag effect
     */
    effectAllowed: string;
    /**
     * Drag cursor
     */
    effectCursor: string;

    /**
     * Restrict places where a draggable element can be dropped. Either one of
     * these two mechanisms can be used:
     *
     * - dropZones: an array of strings that permits to specify the drop zones
     *   associated with this component. By default, if the drop-zones attribute
     *   is not specified, the droppable component accepts drop operations by
     *   all the draggable components that do not specify the allowed-drop-zones
     *
     * - allowDrop: a boolean function for droppable components, that is checked
     *   when an item is dragged. The function is passed the dragData of this
     *   item.
     *   - if it returns true, the item can be dropped in this component
     *   - if it returns false, the item cannot be dropped here
     */
    allowDrop: (dropData: any) => boolean;
    dropZones: string[] = [];

    /**
     * Here is the property dragImage you can use:
     * - The string value as url to the image
     *   <div class="panel panel-default"
     *        dnd-draggable [dragEnabled]="true"
     *        [dragImage]="/images/simpler.png">
     * ...
     * - The DragImage value with Image and optional offset by x and y:
     *   let myDragImage: DragImage = new DragImage("/images/simpler1.png", 0, 0);
     * ...
     *   <div class="panel panel-default"
     *        dnd-draggable [dragEnabled]="true"
     *        [dragImage]="myDragImage">
     * ...
     * - The custom function to return the value of dragImage programmatically:
     *   <div class="panel panel-default"
     *        dnd-draggable [dragEnabled]="true"
     *        [dragImage]="getDragImage(someData)">
     * ...
     *   getDragImage(value:any): string {
     *     return value ? "/images/simpler1.png" : "/images/simpler2.png"
     *   }
     */
    dragImage: string | DragImage | Function;

    cloneItem: boolean = false;

    constructor(elemRef: ElementRef, public _dragDropService: DragDropService, public _config: DragDropConfig,
        private _cdr: ChangeDetectorRef) {

        // Assign default cursor unless overridden
        this._defaultCursor = _config.defaultCursor;
        this._elem = elemRef.nativeElement;
        this._elem.style.cursor = this._defaultCursor;  // set default cursor on our element
        //
        // DROP events
        //
        this._elem.ondragenter = (event: Event) => {
            this._onDragEnter(event);
        };
        this._elem.ondragover = (event: DragEvent) => {
            this._onDragOver(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.dropEffect = this._config.dropEffect.name;
            }

            return false;
        };
        this._elem.ondragleave = (event: Event) => {
            this._onDragLeave(event);
        };
        this._elem.ondrop = (event: Event) => {
            this._onDrop(event);
        };
        //
        // Drag events
        //
        this._elem.onmousedown = (event: MouseEvent) => {
            this._target = event.target;
        };
        this._elem.ondragstart = (event: DragEvent) => {
            if (this._dragHandle && this._dragEnabled) {
                if (!this._dragHandle.contains(<Element>this._target)) {
                    event.preventDefault();
                    return;
                }
            }

            this._onDragStart(event);
            //
            if (event.dataTransfer != null) {
                event.dataTransfer.setData('text', '');
                // Change drag effect
                event.dataTransfer.effectAllowed = this.effectAllowed || this._config.dragEffect.name;
                // Change drag image
                if (isPresent(this.dragImage)) {
                    if (isString(this.dragImage)) {
                        (<any>event.dataTransfer).setDragImage(createImage(<string>this.dragImage));
                    } else if (isFunction(this.dragImage)) {
                        (<any>event.dataTransfer).setDragImage(callFun(<Function>this.dragImage));
                    } else {
                        let img: DragImage = <DragImage>this.dragImage;
                        (<any>event.dataTransfer).setDragImage(img.imageElement, img.x_offset, img.y_offset);
                    }
                } else if (isPresent(this._config.dragImage)) {
                    let dragImage: DragImage = this._config.dragImage;
                    (<any>event.dataTransfer).setDragImage(dragImage.imageElement, dragImage.x_offset, dragImage.y_offset);
                } else if (this.cloneItem) {
                    this._dragHelper = <HTMLElement>this._elem.cloneNode(true);
                    this._dragHelper.classList.add('dnd-drag-item');
                    this._dragHelper.style.position = "absolute";
                    this._dragHelper.style.top = "0px";
                    this._dragHelper.style.left = "-1000px";
                    this._elem.parentElement.appendChild(this._dragHelper);
                    (<any>event.dataTransfer).setDragImage(this._dragHelper, event.offsetX, event.offsetY);
                }

                // Change drag cursor
                let cursorelem = (this._dragHandle) ? this._dragHandle : this._elem;

                if (this._dragEnabled) {
                    cursorelem.style.cursor = this.effectCursor ? this.effectCursor : this._config.dragCursor;
                } else {
                    cursorelem.style.cursor = this._defaultCursor;
                }
            }
        };

        this._elem.ondragend = (event: Event) => {
            if (this._elem.parentElement && this._dragHelper) {
                this._elem.parentElement.removeChild(this._dragHelper);
            }
            // console.log('ondragend', event.target);
            this._onDragEnd(event);
            // Restore style of dragged element
            let cursorelem = (this._dragHandle) ? this._dragHandle : this._elem;
            cursorelem.style.cursor = this._defaultCursor;
        };
    }

    public setDragHandle(elem: HTMLElement) {
        this._dragHandle = elem;
    }
    /******* Change detection ******/

    detectChanges () {
        // Programmatically run change detection to fix issue in Safari
        setTimeout(() => {
            if ( this._cdr && !(this._cdr as ViewRef).destroyed ) {
                this._cdr.detectChanges();
            }
        }, 250);
    }

    //****** Droppable *******//
    private _onDragEnter(event: Event): void {
        // console.log('ondragenter._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // event.preventDefault();
            this._onDragEnterCallback(event);
        }
    }

    private _onDragOver(event: Event) {
        // // console.log('ondragover._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // The element is over the same source element - do nothing
            if (event.preventDefault) {
                // Necessary. Allows us to drop.
                event.preventDefault();
            }

            this._onDragOverCallback(event);
        }
    }

    private _onDragLeave(event: Event): void {
        // console.log('ondragleave._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // event.preventDefault();
            this._onDragLeaveCallback(event);
        }
    }

    private _onDrop(event: Event): void {
        // console.log('ondrop._isDropAllowed', this._isDropAllowed);
        if (this._isDropAllowed(event)) {
            // Necessary. Allows us to drop.
            this._preventAndStop(event);

            this._onDropCallback(event);

            this.detectChanges();
        }
    }

    private _isDropAllowed(event: any): boolean {
        if ((this._dragDropService.isDragged || (event.dataTransfer && event.dataTransfer.files)) && this.dropEnabled) {
            // First, if `allowDrop` is set, call it to determine whether the
            // dragged element can be dropped here.
            if (this.allowDrop) {
                return this.allowDrop(this._dragDropService.dragData);
            }

            // Otherwise, use dropZones if they are set.
            if (this.dropZones.length === 0 && this._dragDropService.allowedDropZones.length === 0) {
                return true;
            }
            for (let i: number = 0; i < this._dragDropService.allowedDropZones.length; i++) {
                let dragZone: string = this._dragDropService.allowedDropZones[i];
                if (this.dropZones.indexOf(dragZone) !== -1) {
                    return true;
                }
            }
        }
        return false;
    }

    private _preventAndStop(event: Event): any {
        if (event.preventDefault) {
            event.preventDefault();
        }
        if (event.stopPropagation) {
            event.stopPropagation();
        }
    }

    //*********** Draggable **********//

    private _onDragStart(event: Event): void {
        //console.log('ondragstart.dragEnabled', this._dragEnabled);
        if (this._dragEnabled) {
            this._dragDropService.allowedDropZones = this.dropZones;
            // console.log('ondragstart.allowedDropZones', this._dragDropService.allowedDropZones);
            this._onDragStartCallback(event);
        }
    }

    private _onDragEnd(event: Event): void {
        this._dragDropService.allowedDropZones = [];
        // console.log('ondragend.allowedDropZones', this._dragDropService.allowedDropZones);
        this._onDragEndCallback(event);
    }

    //**** Drop Callbacks ****//
    _onDragEnterCallback(event: Event) { }
    _onDragOverCallback(event: Event) { }
    _onDragLeaveCallback(event: Event) { }
    _onDropCallback(event: Event) { }

    //**** Drag Callbacks ****//
    _onDragStartCallback(event: Event) { }
    _onDragEndCallback(event: Event) { }
}

export class AbstractHandleComponent {
    _elem: HTMLElement;
    constructor(elemRef: ElementRef, public _dragDropService: DragDropService, public _config: DragDropConfig,
        private _Component: AbstractComponent, private _cdr: ChangeDetectorRef) {
        this._elem = elemRef.nativeElement;
        this._Component.setDragHandle(this._elem);
    }
}
