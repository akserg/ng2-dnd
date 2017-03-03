# Angular 2 Drag-and-Drop [![npm version](https://badge.fury.io/js/ng2-dnd.svg)](https://badge.fury.io/js/ng2-dnd) [![npm monthly downloads](https://img.shields.io/npm/dm/ng2-dnd.svg?style=flat-square)](https://www.npmjs.com/package/ng2-dnd)
Angular 2 Drag-and-Drop without dependencies.

[![Build Status](https://travis-ci.org/obosha/ng2-dnd.svg?branch=master)](https://travis-ci.org/obosha/ng2-dnd)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) 
[![Dependency Status](https://david-dm.org/obosha/ng2-dnd.svg)](https://david-dm.org/obosha/ng2-dnd)
[![devDependency Status](https://david-dm.org/obosha/ng2-dnd/dev-status.svg)](https://david-dm.org/obosha/ng2-dnd#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/obosha/ng2-dnd/badge.svg)](https://snyk.io/test/github/obosha/ng2-dnd)

_Some of these APIs and Components are not final and are subject to change!_

## Installation
```bash
npm install ng2-dnd --save
```

## Usage
If you use SystemJS to load your files, you might have to update your config:

```js
System.config({
    map: {
        'ng2-dnd': 'node_modules/ng2-dnd/bundles/index.umd.js'
    }
});
```

#### 1. Add the default styles
- Import the `style.css` into your web page

#### 2. Import the `DndModule`
Import `DndModule.forRoot()` in the NgModule of your application. 
The `forRoot` method is a convention for modules that provide a singleton service.

```ts
import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from '@angular/core';
import {DndModule} from 'ng2-dnd';

@NgModule({
    imports: [
        BrowserModule,
        DndModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
```

If you have multiple NgModules and you use one as a shared NgModule (that you import in all of your other NgModules), 
don't forget that you can use it to export the `DndModule` that you imported in order to avoid having to import it multiple times.

```ts
@NgModule({
    imports: [
        BrowserModule,
        DndModule.forRoot()
    ],
    exports: [BrowserModule, DndModule],
})
export class SharedModule {
}
```

#### 3. Use Drag-and-Drop operations with no code

```js
import {Component} from '@angular/core';

@Component({
    selector: 'simple-dnd',
    template: `
<h4>Simple Drag-and-Drop</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true">
                    <div class="panel-body">
                        <div>Drag Me</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-info" (onDropSuccess)="simpleDrop=$event">
            <div class="panel-heading">Place to drop</div>
            <div class="panel-body">
                <div *ngIf="simpleDrop">Item was dropped here</div>
            </div>
        </div>
    </div>
</div>`
})
export class SimpleDndComponent {
    simpleDrop: any = null;
}
```

#### 4. Restriction Drag-and-Drop operations with drop zones
You can use property *dropZones* (actually an array) to specify in which place you would like to drop the draggable element:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'zone-dnd',
    template: `
<h4>Restricted Drag-and-Drop with zones</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-primary">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true" [dropZones]="['zone1']">
                    <div class="panel-body">
                        <div>Drag Me</div>
                        <div>Zone 1 only</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="panel panel-success">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true" [dropZones]="['zone1', 'zone2']">
                    <div class="panel-body">
                        <div>Drag Me</div>
                        <div>Zone 1 & 2</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-info" [dropZones]="['zone1']" (onDropSuccess)="restrictedDrop1=$event">
            <div class="panel-heading">Zone 1</div>
            <div class="panel-body">
                <div *ngIf="restrictedDrop1">Item was dropped here</div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-warning" [dropZones]="['zone2']" (onDropSuccess)="restrictedDrop2=$event">
            <div class="panel-heading">Zone 2</div>
            <div class="panel-body">
                <div *ngIf="restrictedDrop2">Item was dropped here</div>
            </div>
        </div>
    </div>
</div>`
})
export class ZoneDndComponent {
    restrictedDrop1: any = null;
    restrictedDrop2: any = null;
}
```

#### 5. Transfer custom data via Drag-and-Drop
You can transfer data from draggable to droppable component via *dragData* property of Draggable component:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'custom-data-dnd',
    template: `
<h4>Transfer custom data in Drag-and-Drop</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragEnabled]="true" [dragData]="transferData">
                    <div class="panel-body">
                        <div>Drag Me</div>
                        <div>{{transferData | json}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable class="panel panel-info" (onDropSuccess)="transferDataSuccess($event)">
            <div class="panel-heading">Place to drop (Items:{{receivedData.length}})</div>
            <div class="panel-body">
                <div [hidden]="!receivedData.length > 0" *ngFor="let data of receivedData">{{data | json}}</div>
            </div>
        </div>
    </div>
</div>`
})
export class CustomDataDndComponent {
    transferData: Object = {id: 1, msg: 'Hello'};
    receivedData: Array<any> = [];

    transferDataSuccess($event: any) {
        this.receivedData.push($event);
    }
}
```

#### 6. Use a custom function to determine where dropping is allowed
For use-cases when a static set of `dropZone`s is not possible, a custom function can be used to dynamically determine whether an item can be dropped or not. To achieve that, set the `allowDrop` property to this boolean function.

In the following example, we have two containers that only accept numbers that are multiples of a user-input base integer. `dropZone`s are not helpful here because they are static, whereas the user input is dynamic.

```js
import { Component } from '@angular/core';

@Component({
    selector: 'custom-function-dnd',
    template: `
<h4>Use a custom function to determine where dropping is allowed</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">Available to drag</div>
            <div class="panel-body">
                <div class="panel panel-default" dnd-draggable [dragData]="6">
                    <div class="panel-body">dragData = 6</div>
                </div>
                <div class="panel panel-default" dnd-draggable [dragData]="10">
                    <div class="panel-body">dragData = 10</div>
                </div>
                <div class="panel panel-default" dnd-draggable [dragData]="30">
                    <div class="panel-body">dragData = 30</div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <pre>allowDropFunction(baseInteger: any): any {{ '{' }}
  return (dragData: any) => dragData % baseInteger === 0;
{{ '}' }}</pre>
        <div class="row">
            <div class="col-sm-6">
                <div dnd-droppable class="panel panel-info" [allowDrop]="allowDropFunction(box1Integer)" (onDropSuccess)="addTobox1Items($event)">
                    <div class="panel-heading">
                        Multiples of
                        <input type="number" [(ngModel)]="box1Integer" style="width: 4em">
                        only
                    </div>
                    <div class="panel-body">
                        <div *ngFor="let item of box1Items">dragData = {{item}}</div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div dnd-droppable class="panel panel-warning" [allowDrop]="allowDropFunction(box2Integer)" (onDropSuccess)="addTobox2Items($event)">
                    <div class="panel-heading">
                        Multiples of
                        <input type="number" [(ngModel)]="box2Integer" style="width: 4em">
                        only
                    </div>
                    <div class="panel-body">
                        <div *ngFor="let item of box2Items">dragData = {{item}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`
})
export class CustomFunctionDndComponent {
    box1Integer: number = 3;
    box2Integer: number = 10;

    box1Items: string[] = [];
    box2Items: string[] = [];

    allowDropFunction(baseInteger: number): any {
        return (dragData: any) => dragData % baseInteger === 0;
    }

    addTobox1Items($event: any) {
        this.box1Items.push($event.dragData);
    }

    addTobox2Items($event: any) {
        this.box2Items.push($event.dragData);
    }
}
```

#### 7. Shopping basket with Drag-and-Drop
Here is an example of shopping backet with products adding via drag and drop operation:

```js
import { Component } from '@angular/core';

@Component({
    selector: 'shoping-basket-dnd',
    template: `
<h4>Drag-and-Drop - Shopping basket</h4>
<div class="row">

    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">Available products</div>
            <div class="panel-body">
                <div *ngFor="let product of availableProducts" class="panel panel-default"
                    dnd-draggable [dragEnabled]="product.quantity>0" [dragData]="product" (onDragSuccess)="orderedProduct($event)" [dropZones]="['demo1']">
                    <div class="panel-body">
                        <div [hidden]="product.quantity===0">{{product.name}} - \${{product.cost}}<br>(available: {{product.quantity}})</div>
                        <div [hidden]="product.quantity>0"><del>{{product.name}}</del><br>(NOT available)</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-3">
        <div dnd-droppable (onDropSuccess)="addToBasket($event)" [dropZones]="['demo1']" class="panel panel-info">
            <div class="panel-heading">Shopping Basket<br>(to pay: \${{totalCost()}})</div>
            <div class="panel-body">
                <div *ngFor="let product of shoppingBasket" class="panel panel-default">
                    <div class="panel-body">
                    {{product.name}}<br>(ordered: {{product.quantity}}<br>cost: \${{product.cost * product.quantity}})
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
})
export class ShoppingBasketDndComponent {
    availableProducts: Array<Product> = [];
    shoppingBasket: Array<Product> = [];

    constructor() {
        this.availableProducts.push(new Product('Blue Shoes', 3, 35));
        this.availableProducts.push(new Product('Good Jacket', 1, 90));
        this.availableProducts.push(new Product('Red Shirt', 5, 12));
        this.availableProducts.push(new Product('Blue Jeans', 4, 60));
    }

    orderedProduct($event: any) {
        let orderedProduct: Product = $event.dragData;
        orderedProduct.quantity--;
    }

    addToBasket($event: any) {
        let newProduct: Product = $event.dragData;
        for (let indx in this.shoppingBasket) {
            let product: Product = this.shoppingBasket[indx];
            if (product.name === newProduct.name) {
                product.quantity++;
                return;
            }
        }
        this.shoppingBasket.push(new Product(newProduct.name, 1, newProduct.cost));
        this.shoppingBasket.sort((a: Product, b: Product) => {
            return a.name.localeCompare(b.name);
        });
    }

    totalCost(): number {
        let cost: number = 0;
        for (let indx in this.shoppingBasket) {
            let product: Product = this.shoppingBasket[indx];
            cost += (product.cost * product.quantity);
        }
        return cost;
    }
}

class Product {
  constructor(public name: string, public quantity: number, public cost: number) {}
}
```

#### 8. Simple sortable with Drag-and-Drop
Here is an example of simple sortable of favorite drinks moving in container via drag and drop operation:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'simple-sortable',
    template: `
<h4>Simple sortable</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">
                Favorite drinks
            </div>
            <div class="panel-body">
                <ul class="list-group" dnd-sortable-container [sortableData]="listOne">
                    <li *ngFor="let item of listOne; let i = index" class="list-group-item" dnd-sortable [sortableIndex]="i">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="panel panel-default">
            <div class="panel-body">
                My prefences:<br/>
                <span *ngFor="let item of listOne; let i = index">{{i + 1}}) {{item}}<br/></span>
            </div>
        </div>
    </div>
</div>`
})
export class SimpleSortableComponent {
    listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
}
```

#### 9. Simple sortable With Drop into recycle bin
Here is an example of multi list sortable of boxers moving in container and between containers via drag and drop operation:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'recycle-multi-sortable',
    template: `
<h4>Simple sortable With Drop into recycle bin</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-success">
            <div class="panel-heading">
                Favorite drinks
            </div>
            <div class="panel-body" dnd-sortable-container [sortableData]="listOne" [dropZones]="['delete-dropZone']">
                <ul class="list-group">
                    <li *ngFor="let item of listOne; let i = index" class="list-group-item"
                    dnd-sortable [sortableIndex]="i">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="panel panel-default">
            <div class="panel-body" dnd-sortable-container [dropZones]="['delete-dropZone']" [sortableData]="listRecycled">
                Recycle bin: Drag into me to delete it<br/>
            </div>
        </div>
        <div *ngIf="listRecycled.length">
        <b>Recycled:</b> <span>{{listRecycled.toString()}} </span>
        </div>
    </div>
</div>`
})
export class RecycleMultiSortableComponent {
    listOne: Array<string> = ['Coffee', 'Orange Juice', 'Red Wine', 'Unhealty drink!', 'Water'];
    listRecycled: Array<string> = [];
}
```

#### 10. Simple sortable With Drop into something, without delete it
Here is an example of simple sortable list of items copying in target container:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'simple-sortable-copy',
    template: `
<h4>Simple sortable With Drop into something, without delete it</h4>
<div class="row">
    <div class="col-sm-3">
        <div class="panel panel-warning"
            dnd-sortable-container [sortableData]="sourceList" [dropZones]="['source-dropZone']">
            <div class="panel-heading">Source List</div>
            <div class="panel-body">
                <ul class="list-group">
                    <li *ngFor="let source of sourceList; let x = index" class="list-group-item"
                        dnd-sortable [sortableIndex]="x" [dragEnabled]="true"
                        [dragData]="source">{{source.name}}</li>
                </ul>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="panel panel-info">
            <div class="panel-heading">Target List</div>
            <div class="panel-body" dnd-droppable (onDropSuccess)="addTo($event)" [dropZones]="['source-dropZone']">
                <ul class="list-group">
                    <li *ngFor="let target of targetList" class="list-group-item">
                        {{target.name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>`
})
export class SimpleSortableCopyComponent {

    sourceList: Widget[] = [
        new Widget('1'), new Widget('2'),
        new Widget('3'), new Widget('4'),
        new Widget('5'), new Widget('6')
    ];

    targetList: Widget[] = [];
    addTo($event: any) {
        this.targetList.push($event.dragData);
    }
}

class Widget {
  constructor(public name: string) {}
}
```

#### 11. Multi list sortable between containers
Here is an example of multi list sortable of boxers moving in container and between containers via drag and drop operation:

```js
import {Component} from '@angular/core';

@Component({
    selector: 'embedded-sortable',
    template: `
<h4>Move items between multi list sortable containers</h4>
<div class="row">
    <div class="col-sm-3">
        Drag Containers <input type="checkbox" [(ngModel)]="dragOperation"/>
        <div dnd-sortable-container [sortableData]="containers" [dropZones]="['container-dropZone']">
            <div class="col-sm3"
                    *ngFor="let container of containers; let i = index"
                    dnd-sortable [sortableIndex]="i" [dragEnabled]="dragOperation">
                <div class="panel panel-warning"
                    dnd-sortable-container [sortableData]="container.widgets" [dropZones]="['widget-dropZone']">
                    <div class="panel-heading">
                        {{container.id}} - {{container.name}}
                    </div>
                    <div class="panel-body">
                        <ul class="list-group">
                            <li *ngFor="let widget of container.widgets; let x = index" class="list-group-item"
                                dnd-sortable [sortableIndex]="x" [dragEnabled]="!dragOperation"
                                [dragData]="widget">{{widget.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col-sm-6">
        <div class="panel panel-info">
            <div class="panel-heading">Widgets</div>
            <div class="panel-body" dnd-droppable (onDropSuccess)="addTo($event)" [dropZones]="['widget-dropZone']">
                <div *ngFor="let widget of widgets" class="panel panel-default">
                    <div class="panel-body">
                        {{widget.name}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`
})
export class EmbeddedSortableComponent {
    dragOperation: boolean = false;

    containers: Array<Container> = [
        new Container(1, 'Container 1', [new Widget('1'), new Widget('2')]),
        new Container(2, 'Container 2', [new Widget('3'), new Widget('4')]),
        new Container(3, 'Container 3', [new Widget('5'), new Widget('6')])
    ];

    widgets: Array<Widget> = [];
    addTo($event: any) {
        if ($event) {
            this.widgets.push($event.dragData);
        }
    }
}

class Container {
  constructor(public id: number, public name: string, public widgets: Array<Widget>) {}
}

class Widget {
  constructor(public name: string) {}
}
```

# Credits
- [Francesco Cina](https://github.com/ufoscout)

# License
 [MIT](/LICENSE)
