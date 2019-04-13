import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Product, ProductserviceService } from '../services/productservice.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.page.html',
  styleUrls: ['./productmanagement.page.scss'],
})
export class ProductmanagementPage implements OnInit {

    // for userauth
userauth: Observable<firebase.User>;
authState: any = null;
 /* Product:  any = {
    img: '../assets/img/nasigoreng.jpg',
    title: 'Food Name',
    Description: 'Food Description',
    price: '0.00'
 }; */

 Products: Product[];

  constructor(private authservice: AuthService,
    private productservice: ProductserviceService,
    private afAuth: AngularFireAuth,
    private navctrl: NavController) { }

  ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {
      this.productservice.inttansid(user.uid);
      this.productservice.getProducts().subscribe( res => {
        this.Products = res;
      });
    });




  }

  remove(item) {
    this.productservice.removeProduct(item.id);
  }


  signOut() {
    this.authservice.signOut();
  }


  addproduct() {
  this.navctrl.navigateForward('addproduct');

  }

}
