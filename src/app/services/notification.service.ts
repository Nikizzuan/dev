import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Notification {

  icon: string;
  img: string;
  title: string;
  message: string;
  date: any;
  recevierid: any;
  group: any;

}


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsCollections: AngularFirestoreCollection<Notification>;
  private notification: Observable<Notification[]>;
  constructor(private db: AngularFirestore) {

    this.notificationsCollections = this.db.collection<Notification>('notification');

    this.notification = this.notificationsCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );


  }



  getnotifications() {
    return this.notification;
  }



  getnotification(id) {
    return this.notificationsCollections.doc<Notification>(id).valueChanges();
  }

  Updatenotification(todo: Notification, id: string) {
    return this.notificationsCollections.doc(id).update(todo);
   }

  addnotification(todo: Notification) {
    return this.notificationsCollections.add(todo);
  }

  addnotification2(todo: Notification, id: string) {
    return this.notificationsCollections.doc(id).set(todo);
  }

  removenotification(id) {
    return this.notificationsCollections.doc(id).delete();
  }


  getCollectionoTtran() {

    const order = 'desc';

    this.notificationsCollections = this.db.collection<Notification>('notification',  ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      if (order) { query = query.orderBy('date', order); }
      return query;
    });


    this.notification = this.notificationsCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );
    return this.notification;
  }

}
