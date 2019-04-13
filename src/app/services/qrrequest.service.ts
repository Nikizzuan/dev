import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Qrdata {
  RequestID: String;
  CustomerEmail: string;
  RetailerEmail: string;
  BillDue: number;
  QrStatus: string;
  CustomerName: String;
  QrCode: any;
 VoucherID: any;
 retailerID: any;
}


@Injectable({
  providedIn: 'root'
})
export class QRrequestService {

  id2: any;
  private QrdatasCollections: AngularFirestoreCollection<Qrdata>;

  private qrdata: Observable<Qrdata[]>;

  constructor(db: AngularFirestore) {

    this.QrdatasCollections = db.collection<Qrdata>('QRrequest');

    this.qrdata = this.QrdatasCollections.snapshotChanges().pipe(map(action => {

      return action.map(a => {
      const data = a.payload.doc.data();
      const id = a.payload.doc.id;
        return{ id, ...data };
      });
    })
    );

  }

  getQrdatas() {
    return this.qrdata;
  }

  getQrdata(id) {
    return this.QrdatasCollections.doc<Qrdata>(id).valueChanges();
  }

  UpdateQrdata(todo: Qrdata, id: string) {
    return this.QrdatasCollections.doc(id).update(todo);
   }

  addQrdata(todo: Qrdata) {
    const id: any = todo.RequestID;
    // return this.QrdatasCollections.add(todo);
    return this.QrdatasCollections.doc(id).set(todo);
  }

  removeQrdata(id) {
    return this.QrdatasCollections.doc(id).delete();
  }

}
