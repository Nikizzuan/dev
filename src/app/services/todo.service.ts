import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Datetime } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// cupon is todo
export interface Todo {
  CuponName: string;
  Retailer: string;
  Expiredate: any;
  CupponType: string;
  Amountalocate: number;
  CupponNum: number;
  ItemList: any;
  discount: number;
  Term: string;
  CreatedAt: number;
  usersCouponID: any;
  expire: string;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

 private todosCollections: AngularFirestoreCollection<Todo>;

 private Cupon: Observable<Todo[]>;
  constructor(private db: AngularFirestore) {
    this.todosCollections = db.collection<Todo>('Cupon');

    this.Cupon = this.todosCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );
  }



  getTodos() {
    return this.Cupon;
  }

  getTodo(id) {
    return this.todosCollections.doc<Todo>(id).valueChanges();
  }

  Updatetod(todo: Todo, id: string) {
    return this.todosCollections.doc(id).update(todo);
   }

  addTodo(todo: Todo, id: any) {
    return this.todosCollections.doc(id).set(todo);
   // return this.todosCollections.add(todo);
  }

  removeTodo(id) {
    return this.todosCollections.doc(id).delete();
  }

  Oninit() {

    const order = 'desc';
    const expire = 'false' ;

    this.todosCollections = this.db.collection<Todo>('Cupon', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      if (expire) { query = query.where('expire', '==', expire); }
      if (order) { query = query.orderBy('CreatedAt', order); }
      return query;
    });


    this.Cupon = this.todosCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );
  }

  Oninit2(uid: any) {

    const order = 'desc';
    const expire = 'false' ;

    this.todosCollections = this.db.collection<Todo>('Cupon', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      if (uid) { query = query.where('Retailer', '==', uid); }
      if (expire) { query = query.where('expire', '==', expire); }
      if (order) { query = query.orderBy('CreatedAt', order); }
      return query;
    });


    this.Cupon = this.todosCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );
  }



}
