import {Injectable} from 'angular2/core';
import {isPresent} from 'angular2/src/facade/lang';

<<<<<<< HEAD
class DragDataTransfer {
=======
interface DragDataTransfer {
>>>>>>> 54c3d595eb67884ec70ab93b1abf1f935a3b9458
    dropEffect?: string;
    effectAllowed?: string;
    files?: FileList;
    items?: DataTransferItemList;
    types?: DOMStringList;
    clearData?: (format?: string) => boolean;
    getData?: (format: string) => string;
    setData?: (format: string, data: string) => boolean;
    setDragImage?: (el: HTMLElement, x: number, y: number) => void
<<<<<<< HEAD
}

export function mobileServiceFactory(): MobileService  {
    return new MobileService();
}
=======
} 
>>>>>>> 54c3d595eb67884ec70ab93b1abf1f935a3b9458

@Injectable()
export class MobileService {

    coordinateSystemForElementFromPoint: string;
    enableEnterLeave: boolean = false;

    dragData: any = {};
    dragDataTypes: DOMStringList = new DOMStringList();
    dragImage: any = null;
    dragImageTransform: any = null;
    dragImageWebKitTransform: any = null;
    customDragImage: any = null;
    customDragImageX: any = null;
    customDragImageY: any = null;
    el: any = null;


    static testNeedsPatch() {

    }

    constructor() {
        this.coordinateSystemForElementFromPoint = navigator.userAgent.match(/OS [1-4](?:_\d+)+ like Mac/) ? "page" : "client";

        // let div = document.createElement('div');
        // let dragDiv = 'draggable' in div;
        // let evts = 'ondragstart' in div && 'ondrop' in div;
        // let needsPatch = !(dragDiv || evts) || /iPad|iPhone|iPod|Android/.test(navigator.userAgent);

        // if (needsPatch) {
        //     console.log('Need patching html5 drag drop');

        //     // if(!this.enableEnterLeave) {
        //     //     DragDrop.prototype.synthesizeEnterLeave = noop;
        //     // }

        //     document.addEventListener("touchstart", touchstart);
        // }
    }

    onTouchStart(event: TouchEvent) {
        var el: HTMLElement = <HTMLElement>event.target;
        do {
            if (el.draggable === true) {
                let touch: Touch = event.touches[0];
                // If draggable isn't explicitly set for anchors, then simulate a click event.
                // Otherwise plain old vanilla links will stop working.
                // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Touch_events#Handling_clicks
                if (!el.hasAttribute("draggable") && el.tagName.toLowerCase() == "a") {
                    var clickEvt = document.createEvent("MouseEvents");
                    clickEvt.initMouseEvent("click", true, true, el.ownerDocument.defaultView, 1,
                        touch.screenX, touch.screenY, touch.clientX, touch.clientY,
                        event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 0, null);
                    el.dispatchEvent(clickEvt);
                    console.log("Simulating click to anchor");
                }
                event.preventDefault();
                this.dispatchDragStart(event, el);
                break;
            }
        } while ((el = <HTMLElement>el.parentNode) && el !== document.body);

    }


    onTouchEnd(event: TouchEvent) {
    //     // we'll dispatch drop if there's a target, then dragEnd.
    //   // drop comes first http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#drag-and-drop-processing-model
    //   console.log("dragend");

    // //   if (this.lastEnter) {
    // //     this.dispatchLeave(event);
    // //   }

    //   var target = elementFromTouchEvent(this.el,event)
    //   if (target) {
    //     console.log("found drop target " + target.tagName);
    //     this.dispatchDrop(target, event);
    //   } else {
    //     console.log("no drop target");
    //   }

    //   var dragendEvt = document.createEvent("Event");
    //   dragendEvt.initEvent("dragend", true, true);
    //   this.el.dispatchEvent(dragendEvt);
    }

    onTouchMove(event: TouchEvent) {
    }

    onTouchCancel(event: TouchEvent) {
    }

    // Dispatcher methods of Drag Events 

    dispatchDragStart(event: TouchEvent, el: HTMLElement) {
        var evt: DragEvent = this._createDragEvent('dragstart', {
            dropEffect: 'move',
            setData: (type: string, val: string) => {
                this.dragData[type] = val;
                // if (this.dragDataTypes.indexOf(type) == -1) {
                //     this.dragDataTypes[this.dragDataTypes.length] = type;
                // }
                return true;
            },
            setDragImage: (el: HTMLElement, x: number, y: number) => {
                this.customDragImage = el;
                this.customDragImageX = x
                this.customDragImageY = y
            }
        });
        return el.dispatchEvent(evt);
    }

    private _createDragEvent(type: string, dt: DragDataTransfer) {
                
        var evt: DragEvent = <DragEvent>document.createEvent("Event");
        evt.initEvent(type, true, true);
        evt.dataTransfer = {
            dropEffect: dt.dropEffect || null,
            effectAllowed: dt.effectAllowed || null ,
            files: dt.files || null,
            items: dt.items || null,
            types: dt.types || null,
            clearData: dt.clearData || null,
            getData: dt.getData || null,
            setData: dt.setData || null
        };
        (<any>evt.dataTransfer).setDragImage = dt.setDragImage || null;
        return evt;
    }

/*
    attach(event: TouchEvent, element: HTMLElement) {
        this.dragData = {};
        this.dragDataTypes = [];
        this.dragImage = null;
        this.dragImageTransform = null;
        this.dragImageWebKitTransform = null;
        this.customDragImage = null;
        this.customDragImageX = null;
        this.customDragImageY = null;
        this.el = element || event.target;

        if (this.dispatchDragStart()) {
            this.createDragImage();
            this.listen();
        }
    }

    // move: any;
    // end: any;
    // cancel: any;

    listen() {
        document.ontouchmove = (event: TouchEvent) => {
            this.move(event);
        }; // onEvt(doc, "touchmove", this.move, this);
        document.ontouchend = (event: TouchEvent) => {
            this.ontouchend(event);
        }; //, "touchend", ontouchend, this);
        document.ontouchcancel = (event: TouchEvent) => {
            this.cleanup();
        }; //, "touchcancel", cleanup, this);
    }

    move(event: TouchEvent) {
        let pageXs: Array<any> = [];
        let pageYs: Array<any> = [];
        [].forEach.call(event.changedTouches, (touch: Touch) {
            pageXs.push(touch.pageX);
            pageYs.push(touch.pageY);
        });

        var x = average(pageXs) - (this.customDragImageX || parseInt(this.dragImage.offsetWidth, 10) / 2);
        var y = average(pageYs) - (this.customDragImageY || parseInt(this.dragImage.offsetHeight, 10) / 2);
        this.translateDragImage(x, y);

        this.synthesizeEnterLeave(event);
    }

    ontouchend(event: TouchEvent) {
        this.dragend(event, event.target);
        this.cleanup();
    }

    cleanup() {
        console.log("cleanup");
        this.dragDataTypes = [];
        if (this.dragImage !== null) {
            this.dragImage.parentNode.removeChild(this.dragImage);
            this.dragImage = null;
            this.dragImageTransform = null;
            this.dragImageWebKitTransform = null;
        }
        this.customDragImage = null;
        this.customDragImageX = null;
        this.customDragImageY = null;
        this.el = this.dragData = null;
        // return [move, end, cancel].forEach(function(handler) {
        //     return handler.off();
        // });
    }

    // We use translate instead of top/left because of sub-pixel rendering and for the hope of better performance
    // http://www.paulirish.com/2012/why-moving-elements-with-translate-is-better-than-posabs-topleft/
    translateDragImage(x: any, y: any) {
        var translate = "translate(" + x + "px," + y + "px) ";

        if (this.dragImageWebKitTransform !== null) {
            this.dragImage.style["-webkit-transform"] = translate + this.dragImageWebKitTransform;
        }
        if (this.dragImageTransform !== null) {
            this.dragImage.style.transform = translate + this.dragImageTransform;
        }
    }

    synthesizeEnterLeave(event: TouchEvent) {
        var target = elementFromTouchEvent(this.el, event)
        if (target != this.lastEnter) {
            if (this.lastEnter) {
                this.dispatchLeave(event);
            }
            this.lastEnter = target;
            if (this.lastEnter) {
                this.dispatchEnter(event);
            }
        }
        if (this.lastEnter) {
            this.dispatchOver(event);
        }
    }

    dragend(event: TouchEvent) {

        // we'll dispatch drop if there's a target, then dragEnd.
        // drop comes first http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#drag-and-drop-processing-model
        console.log("dragend");

        if (this.lastEnter) {
            this.dispatchLeave(event);
        }

        var target = elementFromTouchEvent(this.el, event)
        if (target) {
            console.log("found drop target " + target.tagName);
            this.dispatchDrop(target, event);
        } else {
            console.log("no drop target");
        }

        var dragendEvt = document.createEvent("Event");
        dragendEvt.initEvent("dragend", true, true);
        this.el.dispatchEvent(dragendEvt);
    }

    dispatchDrop(target: any, event: TouchEvent) {
        var dropEvt: DragEvent = <DragEvent>document.createEvent("Event");
        dropEvt.initEvent("drop", true, true);

        var touch: Touch = event.changedTouches[0];
        var x = touch[this.coordinateSystemForElementFromPoint + 'X'];
        var y = touch[this.coordinateSystemForElementFromPoint + 'Y'];

        var targetOffset = getOffset(target);

        dropEvt.offsetX = x - targetOffset.x;
        dropEvt.offsetY = y - targetOffset.y;

        dropEvt.dataTransfer = {
            types: this.dragDataTypes,
            getData: (type: string) => {
                return this.dragData[type];
            },
            dropEffect: "move",
            effectAllowed: "move",
            files: null,
            items: null,
            clearData: null,
            setData: null
        };
        dropEvt.preventDefault = function () {
            // https://www.w3.org/Bugs/Public/show_bug.cgi?id=14638 - if we don't cancel it, we'll snap back
        }.bind(this);

        //   once(doc, "drop", function() {
        //     log("drop event not canceled");
        //   },this);

        target.dispatchEvent(dropEvt);
    }

    dispatchEnter(event: TouchEvent) {

        var enterEvt: DragEvent = <DragEvent>document.createEvent("Event");
        enterEvt.initEvent("dragenter", true, true);
        enterEvt.dataTransfer = {
            types: this.dragDataTypes,
            getData: (type: string) => {
                return this.dragData[type];
            },
            dropEffect: "move",
            effectAllowed: "move",
            files: null,
            items: null,
            clearData: null,
            setData: null
        };

        var touch = event.changedTouches[0];
        enterEvt.pageX = touch.pageX;
        enterEvt.pageY = touch.pageY;
        enterEvt.clientX = touch.clientX;
        enterEvt.clientY = touch.clientY;

        this.lastEnter.dispatchEvent(enterEvt);
    }

    dispatchOver(event: TouchEvent) {

        var overEvt: DragEvent = <DragEvent>document.createEvent("Event");
        overEvt.initEvent("dragover", true, true);
        overEvt.dataTransfer = {
            types: this.dragDataTypes,
            getData: (type: string) => {
                return this.dragData[type];
            },
            dropEffect: "move",
            effectAllowed: "move",
            files: null,
            items: null,
            clearData: null,
            setData: null
        };

        var touch = event.changedTouches[0];
        overEvt.pageX = touch.pageX;
        overEvt.pageY = touch.pageY;
        overEvt.clientX = touch.clientX;
        overEvt.clientY = touch.clientY;

        this.lastEnter.dispatchEvent(overEvt);
    }


    dispatchLeave(event: TouchEvent) {

        var leaveEvt: DragEvent = <DragEvent>document.createEvent("Event");
        leaveEvt.initEvent("dragleave", true, true);
        leaveEvt.dataTransfer = {
            types: this.dragDataTypes,
            getData: (type: string) => {
                return this.dragData[type];
            },
            dropEffect: "move",
            effectAllowed: "move",
            files: null,
            items: null,
            clearData: null,
            setData: null
        };

        var touch = event.changedTouches[0];
        leaveEvt.pageX = touch.pageX;
        leaveEvt.pageY = touch.pageY;
        leaveEvt.clientX = touch.clientX;
        leaveEvt.clientY = touch.clientY;

        this.lastEnter.dispatchEvent(leaveEvt);
        this.lastEnter = null;
    }
*/

}