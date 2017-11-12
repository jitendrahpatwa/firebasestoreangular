import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Item } from '../shared/item';
import { ItemService } from '../shared/item.service';
import { DumService } from '../shared/dum.service';

@Component({
  selector: 'item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss'],
  providers:[DumService]
})
export class ItemFormComponent implements OnInit {

  item: Item = new Item();

  product:any;
  productItems:any = [];

  constructor(
    private itemSvc: ItemService,
    private dumServ: DumService
  ) {
    //this.dumServ.dis(product);
   }

  ngOnInit() {
    this.loadthistopush();
    this.productItems = this.dumServ.vie();
    console.log(this.productItems);
  }

  createItem() {
    this.itemSvc.createItem(this.item)
    this.item = new Item() // reset item
  }

  createItem2(){
    if(this.product == null || this.product == ""){
      console.error("empty");
    }else{
      this.dumServ.dis(this.product);
      //this.productItems = this.dumServ.vie();
    }
  }

  loadthistopush(){
    console.log("took")
    this.productItems = this.dumServ.vie();
  }

}
