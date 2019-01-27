import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.page.html',
  styleUrls: ['./registerpage.page.scss'],
})
export class RegisterpagePage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {

  }


  regStudent() {
    this.navCtrl.navigateForward('studentreg');
  }

  regStaff() {
    this.navCtrl.navigateForward('staffreg');
  }

  regRetailer() {
    this.navCtrl.navigateForward('retailerreg');
  }

}
