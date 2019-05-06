import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadserviceService {

  constructor() { }

  uploadImage(imageURI) {
    return new Promise<any>((resolve, reject) => {
      const imagename =  Date.now().toLocaleString();
      const storageRef = firebase.storage().ref();
      const imageRef = storageRef.child('image').child(imagename);
      this.encodeImageUri(imageURI, function(image64) {
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL().then(downloadURL => {
            resolve(downloadURL);
         });
        }, err => {
          reject(err);
        });
      });
    });
  }

  encodeImageUri(imageUri, callback) {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    const img = new Image();
    img.onload = function () {
      const aux: any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      const dataURL = c.toDataURL('image/jpeg');
      callback(dataURL);
    };
    img.src = imageUri;
  }

}
