import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'my-app',
	template: `
 <div class="container">
 	<div class="row">
		<div  class="col-md-4" >
			shops
			<button class='createShop' (click)="createShop()">Add Shop</button>
			<div  *ngFor="let shop of shops" class="shop" (click)="chooseShop(shop)">
				<div>ID  {{shop.id}}</div>
				<div>shopname  {{shop.name}}</div>
				<div>address  {{shop.address}}</div>
				<button  (click)="onRedactShop(shop)" >redactShop</button>
				<button  (click)="onDelete(shop)" >onDelete</button>
				<div  class="redactShop" *ngIf="redactShop==shop">
					redactShop
					<div>
						ID  	{{redactShop.id}}
					</div>
					<input [(ngModel)]="redactShop.name"  placeholder="enter name" />
					<input [(ngModel)]="redactShop.address"  placeholder="enter address" />
					{{redactShop.name}}
					{{redactShop.address}}
					<button  (click)="onClose()" >close</button>
				</div>
			</div>
		</div>
		
		
		<div   class="col-md-6"style=" background-color:#CECCE0;" >
			<div class="container" container>
				<div  class="row">
					<div  class="col-md-4" *ngFor="let item of items" >
						<div class='cardItem'>
							item.name {{item.name}}
							item.description {{item.description}}
						</div>
						<button  (click)="onRedactItems(item)" >redactShop</button>
						<div  class="redactItem" *ngIf="redactItem==item">
							<input [(ngModel)]="redactItem.name"  placeholder="enter name" />
							<input [(ngModel)]="redactItem.description"  placeholder="enter description" />
							<button  (click)="onCloseItemRedact()" >close</button>
						</div>
					</div>
					<div class="addGoods" *ngIf='activeShop' (click)="addGoods()">add item</div>	
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
	) {
	}
	ngOnInit() {
		this.initShop();

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
				"name": "shop1",
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