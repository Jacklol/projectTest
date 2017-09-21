import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula'
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
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
					<div>ID : {{shop.id}}</div>
					<div>shop name : {{shop.name}}</div>
					<div>address : {{shop.address}}</div>
					<div>warkTime{{shop.warkTime}}</div>
					<button  (click)="onRedactShop(shop)"  class='button black small'>redactShop</button>
					<button  (click)="onDelete(shop)"  class='button black small'>delete</button>
					<div  class="redactShop" *ngIf="redactShop==shop">
						redactShop
						<div>
							ID  	{{redactShop.id}}
						</div>
						<input [(ngModel)]="redactShop.name"  placeholder="enter name" />
						<input [(ngModel)]="redactShop.address"  placeholder="enter address" />
						<input [(ngModel)]="shop.warkTime"  placeholder="enter warkTime" />
						<button  (click)="onClose(shop)" class='button black small'>ok</button>
					</div>
				</li>
			</ul>
		</div>
		
		<div   class="col-md-8"style=" background-color:#CECCE0;" >
			<div class="container-fluid">
			Select Shop ID: {{activeShop?.id}}  Name  : {{activeShop?.name}}
				<div  class="row">
					<div  class="col-md-4" *ngFor="let item of items" >
						<div class='cardItem'>
							<div> {{item.name}}</div>
							<div> {{item.description}}</div>
							<button  (click)="onRedactItems(item)" class='button black small'>RedactItem</button>
							<button  (click)="onDeleteItem(item)" class='button black small'>Delete</button>
							<div  class="redactItem" *ngIf="redactItem==item">
								<input [(ngModel)]="redactItem.name"  placeholder="enter name" />
								<input [(ngModel)]="redactItem.description"  placeholder="enter description" />
								<button  (click)="onCloseItemRedact()" class='button black small'>close</button>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="addGoods" *ngIf='activeShop' >
							<input [(ngModel)]="addItemName"  placeholder="enter name" />
							<input [(ngModel)]="addItemDescription"  placeholder="enter description" />
							add item
							<button (click)="addGoods()">add Item</button>
						</div>	
					</div>
				</div>
				<agm-map [latitude]="lat" [longitude]="lng" *ngIf='activeShop'>
					<agm-marker [latitude]="lat" [longitude]="lng"></agm-marker>
			  	</agm-map>
			</div>
		</div>

			
		
	</div>	
</div>	
	 
  `, styleUrls: ["./css/app-component.css"]
})
export class AppComponent {
	addItemName:string='';
	addItemDescription:string='';
	lat: number;
	lng: number;
	address:string;
	redactItem:any;
	activeShop: any;
	redactShop: any;
	shops: Array<any> = [];
	items: Array<any> = [];
	constructor(private http: Http,
		private dragulaService: DragulaService
	) {
		
	}
	ngOnInit() {
		this.initShop();
		this.dragulaService.drag.subscribe((value:any) => {
			this.onDrag(value.slice(1));
		  });
		this.dragulaService.drop.subscribe((value:any) => {
			this.onDrop(value.slice(1));
		  });
	}
	private onDrag(args:any) {
		let [e, el] = args;
	  }
	
	  private onDrop(args:any) {
		let [e, el] = args;
		this.recreateShop(args);
	  }
	  recreateShop(args:any){
		let [e, el] = args ;
		var oldPos=e.id-1;
		console.log(oldPos);
		var temp=this.shops[oldPos];
		var collection=el.getElementsByTagName('li');
		var newPos;
		var newPosID;
		for (var i = 0; i < collection.length; i++) { 
			var id = collection[i].getAttribute("id"); 
			if ( id ==e.id ) { 
				newPos=i;
				console.log(id)
				newPosID=id ;	
				console.log("newpos"+newPos);// grab the data 
			}
		}
		console.log(this.shops)
		this.shops[oldPos]=this.shops[newPos];
		this.shops[oldPos].id=+e.id;
		console.log("+e.id");
		console.log(+e.id);
		this.shops[newPos]=temp;
		console.log("+newPosID");
		console.log(+newPosID);
		this.shops[newPos].id=+newPos+1 ;	
		console.log(this.shops);
	
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
			"name": "SHOP"+id,
			"address": "pobediteley"+id,
			"warkTime":"7-17",
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
	onClose(shop:any) {
		this.redactShop = false;
		this.address=shop.address;
		this.GeolocationApi();
	}
	onCloseItemRedact(){
		this.redactItem=false
	}
	onDelete(shop: any) {
		var pos = this.shops.indexOf(shop);
		this.shops.splice(pos, 1);
		this.shops.forEach((item,i,arr)=>{
			if (i>=pos){
				this.shops[i].id=this.shops[i].id-1;
			}
		})
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
			"address": "parnikova",
			"warkTime":'7-17',
			id: 1,
			items: [{
				"name": "name",
				"description": "description"
			},{
				"name": "name 1",
				"description": "description"
			}]
		}, {
				"name": "shop2",
				"address": "pobediteley",
				"warkTime":'7-17',
				id: 2,
				items:  [{
					"name": "name",
					"description": "description"
				}]
			});
	}
	chooseShop(shop: any) {
		this.activeShop = shop;
		this.items=shop.items;
		this.address=shop.address;
		this.GeolocationApi();
		
		
	}
	GeolocationApi(){
		console.log()
		return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?'+"address="+this.address+'&key=AIzaSyA51SdDQgsoGnOzVrmzSDVDTJTBLtbaIEM')
		.map((res) => res.json())
		.subscribe(txt => {
			if(txt.results.length==0) return;
			this.lat = txt.results[0].geometry.location.lat;
			this.lng =txt.results[0].geometry.location.lng;
		});
	}
	addGoods(){
		this.shops.forEach((item,i,arr)=>{
			if (this.activeShop==item){
				this.shops[i].items.push({
					"name":this.addItemName,
					"description":this.addItemDescription
				})
				this.addItemName="name "+this.shops[i].items.length;
				this.addItemDescription="description "+this.shops[i].items.length;
			}
		}
	)
	}
}	