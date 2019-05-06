import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Request {

  amount: number;
  date: any;
  retailerID: string;
  status: any;

}



@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requestsCollections: AngularFirestoreCollection<Request>;
  private request: Observable<Request[]>;
  constructor(private db: AngularFirestore) {
    this.requestsCollections = this.db.collection<Request>('request');
    this.request = this.requestsCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );

  }



  getrequests() {
    return this.request;
  }



  getrequest(id) {
    return this.requestsCollections.doc<Request>(id).valueChanges();
  }

  Updaterequest(todo: Request, id: string) {
    return this.requestsCollections.doc(id).update(todo);
   }

  addrequest(todo: Request) {
    return this.requestsCollections.add(todo);
  }

  removerequest(id) {
    return this.requestsCollections.doc(id).delete();
  }

  getCollectionDonation(reid: any) {

    const query2 = 'unapprove';


    this.requestsCollections = this.db.collection<Request>('request', ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
       if (reid) { query = query.where('retailerID', '==', reid); }
       if (query2) { query = query.where('status', '==', query2); }
      return query;
    });


    this.request = this.requestsCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );
    return this.request;
  }

}
