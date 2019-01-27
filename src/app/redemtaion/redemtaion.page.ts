import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-redemtaion',
  templateUrl: './redemtaion.page.html',
  styleUrls: ['./redemtaion.page.scss'],
})
export class RedemtaionPage implements OnInit {

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }


  signOut() {
    this.authservice.signOut();
  }
}
