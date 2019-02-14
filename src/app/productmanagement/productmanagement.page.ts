import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Product, ProductserviceService } from '../services/productservice.service';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.page.html',
  styleUrls: ['./productmanagement.page.scss'],
})
export class ProductmanagementPage implements OnInit {

 /* Product:  any = {
    img: '../assets/img/nasigoreng.jpg',
    title: 'Food Name',
    Description: 'Food Description',
    price: '0.00'
 }; */

 Products: Product[];

  constructor(private authservice: AuthService,private productservice: ProductserviceService) { }

  ngOnInit() {

    this.productservice.getProducts().subscribe( res => {
      this.Products = res;
    });
  }

  remove(item) {
    this.productservice.removeProduct(item.id);
  }


  signOut() {
    this.authservice.signOut();
  }


}
