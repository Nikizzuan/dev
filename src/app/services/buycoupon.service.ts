import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';



export interface UserCoupon {
  CuponName: string;
  Retailer: string;
  Expiredate: string;
  CupponType: string;
  Amountalocate: string;
  CupponNum: string;
  ItemList: any;
  discount: string;
  Term: string;
  CreatedAt: number;

}


@Injectable({
  providedIn: 'root'
})
export class BuycouponService {

  userID: any;
usercurr: any
// modal: any;
userauth: Observable<firebase.User>;
authState: any = null;


  private userCuoponCollections: AngularFirestoreCollection<UserCoupon>;

  private userCuopon: Observable<UserCoupon[]>;


  constructor(db: AngularFirestore, 
    private authservice: AuthService, 
    private afAuth: AngularFireAuth) { 


      this.userCuoponCollections = db.collection<UserCoupon>('UserCoupon');

      this.userCuopon = this.userCuoponCollections.snapshotChanges().pipe(map(action => {
  
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return{ id, ...data };
        });
      })
      );



    }
}
