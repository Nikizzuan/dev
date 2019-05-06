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
import { NavController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { UploadserviceService } from '../services/uploadservice.service';
import { Crop } from '@ionic-native/crop/ngx';


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
    img: '../assets/img/uploadimage.png',
    title: '',
    Description: '',
    price: '',
    retailer: '',
    ischecked: false,
    retaileruid: '',
    counter: 0
 };

 finalimage: any = null;

 prductId = null;
  toastCtrl: any;

  constructor( private route: ActivatedRoute,
     private productService: ProductserviceService,
    // public camera: Camera,
     private file: File,
     private userservice: RetailerinfoService,
    private afAuth: AngularFireAuth,
    private navctrl: NavController,
    private webview: WebView,
    public cropService: Crop,
    private uploadservice: UploadserviceService,
    private imagePicker: ImagePicker) { }

  ngOnInit() {

    // firebase.initializeApp({});
    this.productService.inttansid(null);
    this.prductId = this.route.snapshot.params['id'];

    if (this.prductId) {
      this.loadProduct();

    }


      // get retailer info

  this.userauth = this.afAuth.authState;

  this.afAuth.auth.onAuthStateChanged(user =>  {
    this.userservice.getUser(user.uid).subscribe( res => {
      this.Product.retailer = res.storeName;
      this.Product.retaileruid = user.uid;
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


        this. goBack();
      });
    } else {
       this.productService.addProduct(this.Product).then(() => {

         this. goBack();
       });
    }
  }


  // camera


  goBack() {

    this.navctrl.goBack();

  }

  // camera v2

  openImagePicker() {
    this.imagePicker.hasReadPermission().then(
      (result) => {
        if (result === false) {
          // no callbacks required as this opens a popup which returns async
          this.imagePicker.requestReadPermission();
        } else if (result === true) {
          this.imagePicker.getPictures({
            maximumImagesCount: 1,
            outputType: 1
          }).then(
            (results) => {
              for (let i = 0; i < results.length; i++) {
                this.Product.img =  'data:image/jpeg;base64,' +  results[i];
              }
            }, (err) => console.log(err)
          );
        }
      }, (err) => {
        console.log(err);
      });
    }

    openImagePickerCrop() {
      this.imagePicker.hasReadPermission().then(
        (result) => {
          if (result === false) {
            // no callbacks required as this opens a popup which returns async
            this.imagePicker.requestReadPermission();
          } else if (result === true) {
            this.imagePicker.getPictures({
              maximumImagesCount: 1,
            //  outputType: 1
            }).then(
              (results) => {
                for (let i = 0; i < results.length; i++) {
                  this.cropService.crop(results[i], {quality: 75}).then(
                    newImage => {
                     /*
                      newImage = this.webview.convertFileSrc(newImage);
                      this.uploadservice.encodeImageUri(newImage, function(image64) {
                        this.finalimage =  'data:image/jpeg;base64,' + image64;
                      });
                      */
                     this.uploadImageToFirebase(newImage);
                    },
                    error => console.error('Error cropping image', error)
                  );
                }
              }, (err) => console.log(err)
            );
          }
        }, (err) => {
          console.log(err);
        });
    }

    uploadImageToFirebase(image) {
      image = this.webview.convertFileSrc(image);

      // uploads img to firebase storage
      this.uploadservice.uploadImage(image)
      .then(photoURL => {
        this.Product.img  = photoURL;
        const toast = this.toastCtrl.create({
          message: 'Image was updated successfully',
          duration: 3000
        });
        toast.present();
        });
      }




}
