import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';


export interface Userinfo {
  userName: string;
  matricNum: string;
  email: string;
  usertype: string;
  storeAdress: string;
}

@Injectable({
  providedIn: 'root'
})
export class RetailerinfoService {


  private userCollections: AngularFirestoreCollection<Userinfo>;

  private user: Observable<Userinfo[]>;

  constructor(db: AngularFirestore, private authservice: AuthService) {

    this.userCollections = db.collection<Userinfo>('UserInfo');

    this.user = this.userCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );
  }


  getUsers() {
    return this.user;
  }

  getUser(id) {
    return this.userCollections.doc<Userinfo>(id).valueChanges();
  }

  UpdateUser(todo: Userinfo, id: string) {
    return this.userCollections.doc(id).update(todo);
   }

  addUser(todo: Userinfo) {
    return this.userCollections.doc(this.authservice.currentUserId).set(todo);
  }

  removeUser(id) {
    return this.userCollections.doc(id).delete();
  }

}
