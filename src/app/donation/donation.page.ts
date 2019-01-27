import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.page.html',
  styleUrls: ['./donation.page.scss'],
})
export class DonationPage implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }

  signOut() {
    this.authservice.signOut();
  }
}
