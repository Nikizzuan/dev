import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-retailerhomepage',
  templateUrl: './retailerhomepage.page.html',
  styleUrls: ['./retailerhomepage.page.scss'],
})
export class RetailerhomepagePage implements OnInit {
  tabsinfo: any;

  transition:  any = {
    icon: 'arrow-round-down',
    icon2: 'remove',
    title: 'Food and beverages',
    amount: '07.00',
    date: Date.now(),
    color: 'red'

 };

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }


  signOut() {
    this.authservice.signOut();
  }


  showTransition() {
this. tabsinfo = 1;
  }
  showVoucher() {
    this. tabsinfo = null;
      }

}
