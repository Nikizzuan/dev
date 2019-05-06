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
  Userid: string;
  retailer: string;
  date: number;
  color: string;
  expense:  boolean;
  month: number;

}



@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionCollections: AngularFirestoreCollection<Transaction>;

 private transaction: Observable<Transaction[]>;

  constructor(private db: AngularFirestore) {

   }

   inttansid(uid: string) {

     const order = 'desc';
    if (uid) {
      /*
      this.transactionCollections = this.db.collection<Transaction>('Transaction', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (order) { query = query.orderBy('date', order); }
        if (uid) { query = query.where('Userid', '==', uid); }
        return query;
      });
      */
     // tslint:disable-next-line:max-line-length
     this.transactionCollections = this.db.collection<Transaction>('Transaction', ref => ref.where('Userid', '==', uid));
    } else {
      this.transactionCollections = this.db.collection<Transaction>('Transaction');

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


  getCollectionoTtran(email: string) {

    const order = 'desc';

    this.transactionCollections = this.db.collection<Transaction>('Transaction', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      if (email) { query = query.where('retailer', '==', email); }
      if (order) { query = query.orderBy('date', order); }
      return query;
    });


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

  getCollectionoTtranuser(userid: string) {

    const order = 'desc';

    this.transactionCollections = this.db.collection<Transaction>('Transaction', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      if (userid) { query = query.where('Userid', '==', userid); }
      if (order) { query = query.orderBy('date', order); }
      return query;
    });


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

}
