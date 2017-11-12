import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Injectable()
export class DumService {

  private basePath = '/dumb'; //rdb obj list

  itemsRef: AngularFireList<any>;
  itemRef:  AngularFireObject<any>;

  items: Observable<any[]>; //  list of objects
  item:  Observable<any>;   //   single object


  constructor(private db: AngularFireDatabase) {
    this.itemsRef = db.list('/dumb')
    console.log('called');
  }

  dis(product):void{
    console.log('loaded');
    let a = this.itemsRef.push({
        samay:"item "+product,
        product:product
    });
    console.log(a);
  }
  vie(){
    return this.itemsRef.snapshotChanges().map(arr => {
        return arr.map(snap => Object.assign(
          snap.payload.val(), { $key: snap.key }) 
        )
    })
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getItemsList(query?) {
    // const itemsRef = afDb.list('/items')
    // return this.itemsRef.valueChanges()
    return this.itemsRef.snapshotChanges().map(arr => {
      return arr.map(snap => Object.assign(
        snap.payload.val(), { $key: snap.key }) 
      )
    })
  }

  // Return a single observable item
  getItem(key: string): Observable<any> {
    const itemPath = `${this.basePath}/${key}`;
    this.item = this.db.object(itemPath).valueChanges();
    return this.item
  }

  // Create a bramd new item
  createItem(item: any): void {
    this.itemsRef.push(item)
  }


  // Update an exisiting item
  updateItem(key: string, value: any): void {
    this.itemsRef.update(key, value)
  }

  // Deletes a single item
  deleteItem(key: string): void {
    this.itemsRef.remove(key)
  }

  // Deletes the entire list of items
  deleteAll(): void {
    this.itemsRef.remove()
  }


  // Default error handling for all actions
  private handleError(error) {
    console.log(error)
  }


}
