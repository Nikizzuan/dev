import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Datetime } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Transaction {
  icon: string;
  icon2: string;
  title: string;
  amount: number;
  date: string;
  color: string;
  expense:  boolean;
  month: string;

}


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionCollections: AngularFirestoreCollection<Transaction>;

 private transaction: Observable<Transaction[]>;

  constructor(db: AngularFirestore) {
    this.transactionCollections = db.collection<Transaction>('Cupon');

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
    return this.transactionCollections.doc<Transaction>(id).valueChanges();
  }

  Updatetransaction(todo: Transaction, id: string) {
    return this.transactionCollections.doc(id).update(todo);
   }

  addtransaction(todo: Transaction) {
    return this.transactionCollections.add(todo);
  }

  removetransaction(id) {
    return this.transactionCollections.doc(id).delete();
  }

}
