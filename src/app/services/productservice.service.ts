import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {

  img: string;
  title: string;
  Description: string;
  price: string;
  retailer: string;
  retaileruid: string;
  ischecked: boolean;
  counter: number;

}


@Injectable({
  providedIn: 'root'
})
export class ProductserviceService {

  private productsCollections: AngularFirestoreCollection<Product>;
  private Product: Observable<Product[]>;
  constructor(private db: AngularFirestore) {}


  inttansid(retailer: string) {

   if (retailer) {

    this.productsCollections = this.db.collection<Product>('Product', ref => ref.where('retaileruid', '==', retailer));
   } else {
     this.productsCollections = this.db.collection<Product>('Product');

   }


   this.Product = this.productsCollections.snapshotChanges().pipe(map(action => {

    return action.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
      return{ id, ...data };
    });
  })
  );

  }

  getProducts() {
    return this.Product;
  }



  getProduct(id) {
    return this.productsCollections.doc<Product>(id).valueChanges();
  }

  UpdateProduct(todo: Product, id: string) {
    return this.productsCollections.doc(id).update(todo);
   }

  addProduct(todo: Product) {
    return this.productsCollections.add(todo);
  }

  removeProduct(id) {
    return this.productsCollections.doc(id).delete();
  }

}
