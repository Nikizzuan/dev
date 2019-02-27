import { Component, OnInit } from '@angular/core';
import { Product, ProductserviceService } from '../services/productservice.service';
import { ActivatedRoute } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';

// FIREBASE
import * as firebase from 'firebase';
import { RetailerinfoService } from '../services/retailerinfo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {
  result;

  // for userauth
userauth: Observable<firebase.User>;
authState: any = null;

  Product:  Product = {
    img: '../assets/img/nasigoreng.jpg',
    title: 'Food Name',
    Description: 'Food Description',
    price: '0.00',
    retailer: '',
    ischecked: false
 };

 prductId = null;

  constructor( private route: ActivatedRoute,
     private productService: ProductserviceService,
     public camera: Camera,
     private file: File,
     private userservice: RetailerinfoService,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {

    // firebase.initializeApp({});

    this.prductId = this.route.snapshot.params['id'];

    if (this.prductId) {
      this.loadProduct();

    }


      // get retailer info

  this.userauth = this.afAuth.authState;

  this.afAuth.auth.onAuthStateChanged(user =>  {

    this.userservice.getUser(user.uid).subscribe( res => {
      this.Product.retailer = res.storeName;
    });


  });


  }


  loadProduct() {
    this.productService.getProduct(this.prductId).subscribe( res => {
      this.Product = res;
    });
  }

  saveProduct() {


    if (this.prductId) {
      this.productService.UpdateProduct(this.Product, this.prductId).then(() => {
      });
    } else {
       this.productService.addProduct(this.Product).then(() => {
       });
    }
  }


  // camera

  async pickImage() {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    try {
      const cameraInfo = await this.camera.getPicture(options);
      const blobInfo = await this.makeFileIntoBlob(cameraInfo);
      const uploadInfo: any = await this.uploadToFirebase(blobInfo);

      alert('File Upload Success ' + uploadInfo.fileName);
    } catch (e) {
      console.log(e.message);
      alert('File Upload Error ' + e.message);
    }
  }

    // FILE STUFF
    makeFileIntoBlob(_imagePath) {
      // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
      return new Promise((resolve, reject) => {
        let fileName = '';
        this.file
          .resolveLocalFilesystemUrl(_imagePath)
          .then(fileEntry => {
            const { name, nativeURL } = fileEntry;

            // get the path..
            const path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
            console.log('path', path);
            console.log('fileName', name);

            fileName = name;

            // we are provided the name, so now read the file into
            // a buffer
            return this.file.readAsArrayBuffer(path, name);
          })
          .then(buffer => {
            // get the buffer and make a blob to be saved
            const imgBlob = new Blob([buffer], {
              type: 'image/jpeg'
            });
            console.log(imgBlob.type, imgBlob.size);
            resolve({
              fileName,
              imgBlob
            });
          })
          .catch(e => reject(e));
      });
    }

     /**
   *
   * @param _imageBlobInfo
   */
  uploadToFirebase(_imageBlobInfo) {
    console.log('uploadToFirebase');
    return new Promise((resolve, reject) => {
      const fileRef = firebase.storage().ref('images/' + _imageBlobInfo.fileName);

      // save path to firestore
      this.Product.img = 'images/' + _imageBlobInfo.fileName;

      const uploadTask = fileRef.put(_imageBlobInfo.imgBlob);

      uploadTask.on(
        'state_changed',
        (_snapshot: any) => {
          console.log(
            'snapshot progess ' +
              (_snapshot.bytesTransferred / _snapshot.totalBytes) * 100
          );
        },
        _error => {
          console.log(_error);
          reject(_error);
        },
        () => {
          // completion...
          resolve(uploadTask.snapshot);
        }
      );
    });
  }


}
