import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Datetime } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// cupon is todo
export interface Todo {
  CuponName: string;
  Retailer: string;
  Expiredate: string;
  CupponType: string;
  Amountalocate: number;
  CupponNum: number;
  ItemList: any;
  discount: number;
  Term: string;
  CreatedAt: number;
  usersCouponID: any;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

 private todosCollections: AngularFirestoreCollection<Todo>;

 private Cupon: Observable<Todo[]>;
  constructor(db: AngularFirestore) {
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

  // resume here  min 26:06

  getTodos() {
    return this.Cupon;
  }

  getTodo(id) {
    return this.todosCollections.doc<Todo>(id).valueChanges();
  }

  Updatetod(todo: Todo, id: string) {
    return this.todosCollections.doc(id).update(todo);
   }

  addTodo(todo: Todo) {
    return this.todosCollections.add(todo);
  }

  removeTodo(id) {
    return this.todosCollections.doc(id).delete();
  }


}
