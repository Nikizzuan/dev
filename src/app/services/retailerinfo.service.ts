import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';


export interface Userinfo {
  userName: string;
  storeName: string;
  matricNum: string;
  email: string;
  usertype: string;
  storeAdress: string;
  University: string;
  UniversirtyPoint: number;
  myeventplaner: string;
  myqrplaner: string;
  StoreLocid: string;
  eWallet: number;
  academicYear: string;

}



@Injectable({
  providedIn: 'root'
})
export class RetailerinfoService {

userID: any;
// modal: any;
userauth: Observable<firebase.User>;
authState: any = null;


  private userCollections: AngularFirestoreCollection<Userinfo>;

  private user: Observable<Userinfo[]>;

  constructor(db: AngularFirestore, private authservice: AuthService, private afAuth: AngularFireAuth) {

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

  /* this how u get array
  this.servicename.functionname().subscribe( res => {
    this.yourarray = res;
  });
  */


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


  getUserbycurrentid() {
    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {

        return this.userCollections.doc<Userinfo>(user.uid).valueChanges();

    });

   }


}
