import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.page.html',
  styleUrls: ['./productmanagement.page.scss'],
})
export class ProductmanagementPage implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  signOut() {
    this.authservice.signOut();
  }


}
