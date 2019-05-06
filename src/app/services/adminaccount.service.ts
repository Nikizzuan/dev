import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Transaction2 {
  icon: string;
  icon2: string;
  title: string;
  amount: number;
  date: number;
  username: any;
  retailername: any;
  expense:  boolean;
  month: number;
  totalbalance: number;


}


@Injectable({
  providedIn: 'root'
})
export class AdminaccountService {

  private transactionCollections: AngularFirestoreCollection<Transaction2>;

 private transaction: Observable<Transaction2[]>;

  constructor(private db: AngularFirestore) {

    this.transactionCollections = this.db.collection<Transaction2>('adminAccount');

    this.transaction = this.transactionCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );

   }



   gettransactions() {
    return this.transaction;
  }

  gettransaction(id) {
    return this.transactionCollections.doc<Transaction2>(id).valueChanges();
  }

  Updatetransaction(todo: Transaction2, id: string) {
    return this.transactionCollections.doc(id).update(todo);
   }

  addtransaction(todo: Transaction2) {
    return this.transactionCollections.add(todo);
  }

  removetransaction(id) {
    return this.transactionCollections.doc(id).delete();
  }


  getCollectionoTtran(email: string) {

    this.transactionCollections = this.db.collection<Transaction2>('adminAccount', ref => ref.where('retailer', '==', email));

    this.transaction = this.transactionCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );
    return this.transaction;
  }

  inttansid(uid: string) {

    const order = 'desc';
   if (uid) {
    this.transactionCollections = this.db.collection<Transaction2>('adminAccount', ref => ref.where('Userid', '==', uid));
   } else {
     this.transactionCollections = this.db.collection<Transaction2>('adminAccount');

   }

   this.transaction = this.transactionCollections.snapshotChanges().pipe(map(action => {

     return action.map(a => {
       const data = a.payload.doc.data();
       const id = a.payload.doc.id;
       return{ id, ...data };
     });
   })
   );

  }
}
