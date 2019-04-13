import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Statement {
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
export class AccountService {

  private statementCollections: AngularFirestoreCollection<Statement>;

 private statement: Observable<Statement[]>;

  constructor(private db: AngularFirestore) {

   }

   inttansid(uid: string) {

     const order = 'desc';
    if (uid) {
      /*
      this.statementCollections = this.db.collection<statement>('statement', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
        if (order) { query = query.orderBy('date', order); }
        if (uid) { query = query.where('Userid', '==', uid); }
        return query;
      });
      */
     // tslint:disable-next-line:max-line-length
     this.statementCollections = this.db.collection<Statement>('accstatement', ref => ref.where('Userid', '==', uid));
    } else {
      this.statementCollections = this.db.collection<Statement>('accstatement');

    }


    this.statement = this.statementCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );

   }

   getstatements() {
    return this.statement;
  }

  getstatement(id) {
    return this.statementCollections.doc<Statement>(id).valueChanges();
  }

  Updatestatement(todo: Statement, id: string) {
    return this.statementCollections.doc(id).update(todo);
   }

  addstatement(todo: Statement) {
    return this.statementCollections.add(todo);
  }

  removestatement(id) {
    return this.statementCollections.doc(id).delete();
  }


  getCollectionoTtran(email: string) {

    this.statementCollections = this.db.collection<Statement>('accstatement', ref => ref.where('retailer', '==', email));

    this.statement = this.statementCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );
    return this.statement;
  }
}
