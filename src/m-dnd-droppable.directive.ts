import {
  Directive, Output, EventEmitter, ChangeDetectorRef, ElementRef, Input
} from "@angular/core";
import { DroppableComponent, DragDropConfig, DragDropService } from "ng2-dnd";

@Directive({
  selector: '[m-dnd-droppable]'
})
export class MDndDroppableDirective {

  @Input() mDropZones: Array<any>;
  @Input() mAllowDrop;
  @Output() onMDropSuccess;
  @Output() onMDragLeave;
  @Output() onMDragEnter;
  @Output() onMDragOver;

  private _super;
  private _events;

  constructor(private elemRef: ElementRef, dragDropService: DragDropService,
              config: DragDropConfig, cdr: ChangeDetectorRef) {
    this.onMDropSuccess = new EventEmitter();
    this.onMDragEnter = new EventEmitter();
    this.onMDragLeave = new EventEmitter();
    this.onMDragOver = new EventEmitter();

    this.storeElemEvents();
    this._super = new DroppableComponent(elemRef, dragDropService, config, cdr);
    this.bindEvents();
    this.bindElemEvents();
  }

  public ngOnInit() {
    let zones = this.mDropZones;
    this._super.dropZones = zones;
    this._super.allowDrop = this.mAllowDrop;
  }

  private bindEvents() {
    this._super.onDropSuccess.subscribe(event => this.onMDropSuccess.emit(event));
    this._super.onDragLeave.subscribe(event => this.onMDragLeave.emit(event));
    this._super.onDragEnter.subscribe(event => this.onMDragEnter.emit(event));
    this._super.onDragOver.subscribe(event => this.onMDragOver.emit(event));
  }

  private storeElemEvents() {
    let elem = this.elemRef.nativeElement;
    this._events = {
      // drag events
      'onmousedown': elem.onmousedown,
      'ondragstart': elem.ondragstart,
      'ondragend': elem.ondragend,
      // drop events
      'ondragenter': elem.ondragenter,
      'ondragover': elem.ondragover,
      'ondragleave': elem.ondragleave,
      'ondrop': elem.ondrop
    };
  }

  private bindElemEvents() {
    let elem = this.elemRef.nativeElement,
      handler = (elem, eventName, prevHandler) => {
          let curHandler = elem[eventName];
          elem[eventName] = function (event) {
            prevHandler && prevHandler(event);
            curHandler && curHandler(event);
          };
      }, eventName;

    for (eventName in this._events) {
      handler(elem, eventName, this._events[eventName]);
    }
  }

}
