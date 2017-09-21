import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula'

@Component({
	selector: 'my-app',
	template: `
 <div class="container">
 	<div class="row">
		<div  class="col-md-4" >
			shops
			<button class='createShop' class='button black  medium' (click)="createShop()">Add Shop</button>
			<ul [dragula]='"bag-one"'>
				<li  *ngFor="let shop of shops" class="shop" 
				[class.activeShop]="shop===activeShop" data-id="{{shop.id}}"
				(click)="chooseShop(shop)">
					<div>ID  {{shop.id}}</div>
					<div>shopname  {{shop.name}}</div>
					<div>address  {{shop.address}}</div>
					<button  (click)="onRedactShop(shop)"  class='button black small'>redactShop</button>
					<button  (click)="onDelete(shop)"  class='button black small'>onDelete</button>
					<div  class="redactShop" *ngIf="redactShop==shop">
						redactShop
						<div>
							ID  	{{redactShop.id}}
						</div>
						<input [(ngModel)]="redactShop.name"  placeholder="enter name" />
						<input [(ngModel)]="redactShop.address"  placeholder="enter address" />
						{{redactShop.name}}
						{{redactShop.address}}
						<button  (click)="onClose()" class='button black small'>close</button>
					</div>
				</li>
			</ul>

		</div>
		
		
		<div   class="col-md-8"style=" background-color:#CECCE0;" >
			<div class="container-fluid" container>
			Select Shop ID: {{activeShop?.id}}  Name {{activeShop?.name}}
				<div  class="row">
					<div  class="col-md-4" *ngFor="let item of items" >
						<div class='cardItem'>
							<div>item.name {{item.name}}</div>
							<div>item.description {{item.description}}</div>
							<button  (click)="onRedactItems(item)" class='button black small'>redactShop</button>
							<button  (click)="onDeleteItem(item)" class='button black small'>onDelete</button>
						</div>
						<div  class="redactItem" *ngIf="redactItem==item">
							<input [(ngModel)]="redactItem.name"  placeholder="enter name" />
							<input [(ngModel)]="redactItem.description"  placeholder="enter description" />
							<button  (click)="onCloseItemRedact()" class='button black small'>close</button>
						</div>
					</div>
					<div class="col-md-4">
						<div class="addGoods" *ngIf='activeShop' (click)="addGoods()">add item</div>	
					</div>
				</div>
			</div>	
		</div>

			
		
	</div>	
</div>	
	 
  `, styleUrls: ["./css/app-component.css"]
})
export class AppComponent {
	redactItem:any;
	activeShop: any;
	redactShop: any;
	shops: Array<any> = [];
	items: Array<any> = [];
	constructor(
		private dragulaService: DragulaService
	) {
		
	}
	ngOnInit() {
		this.initShop();
		this.dragulaService.drag.subscribe((value) => {
			this.onDrag(value.slice(1));
		  });
		this.dragulaService.drop.subscribe((value) => {
			this.onDrop(value.slice(1));
		  });
	}

	private hasClass(el: any, name: string) {
		return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
	  }
	
	  private addClass(el: any, name: string) {
		if (!this.hasClass(el, name)) {
		  el.className = el.className ? [el.className, name].join(' ') : name;
		}
	  }
	
	  private removeClass(el: any, name: string) {
		if (this.hasClass(el, name)) {
		  el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
		}
	  }

	private onDrag(args) {
		let [e, el] = args;
		this.removeClass(e, 'ex-moved');
	  }
	
	  private onDrop(args) {
		let [e, el] = args;
		this.addClass(e, 'ex-moved');
		console.log(e)
		console.log(el)
	  }

	createShop() {
		var id = 1;
		var idRepeat = () => {
			for (var index = 0; index < this.shops.length; index++) {
				if (this.shops[index].id === id) {
					id++;
					idRepeat();
				}
			}
		}
		idRepeat();
		this.shops.push({
			"name": "",
			"address": "",
			"id": id,
			items: []
		})
		
	}
	onRedactShop(shop: any) {
		this.redactShop = shop;
	}
	onRedactItems(item:any){
		console.log(item);
		this.redactItem=item;
	}
	onClose() {
		this.redactShop = false;
	}
	onCloseItemRedact(){
		this.redactItem=false
	}
	onDelete(shop: any) {
		var pos = this.shops.indexOf(shop);
		this.shops.splice(pos, 1);
	}
	onDeleteItem(item:any){
	this.shops.forEach((it,i,arr)=>{
			if (this.activeShop==it){
				var pos = 	this.shops[i].items.indexOf(item);
				this.shops[i].items.splice(pos, 1);
			}
		}) 
	}
	 
	initShop() {
		this.shops.push({
			"name": "shop1",
			"address": "parnilovay",
			id: 1,
			items: [{
				"name": "1",
				"description": "good choise"
			},{
				"name": "1",
				"description": "good choise"
			}]
		}, {
				"name": "shop2",
				"address": "parnilovay",
				id: 2,
				items:  [{
					"name": "2",
					"description": "good choise"
				}]
			});
	}
	chooseShop(shop: any) {
		this.activeShop = shop;
		this.items=shop.items;
		
	}
	addGoods(){
		this.shops.forEach((item,i,arr)=>{
			if (this.activeShop==item){
				this.shops[i].items.push({
					"name": "name",
					"description": "description"
				})
			}
		}
	)
	}
}