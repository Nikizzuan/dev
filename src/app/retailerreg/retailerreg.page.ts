import { Component, OnInit } from '@angular/core';
import { Userinfo, RetailerinfoService } from '../services/retailerinfo.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-retailerreg',
  templateUrl: './retailerreg.page.html',
  styleUrls: ['./retailerreg.page.scss'],
})
export class RetailerregPage implements OnInit {

  user: Userinfo = {
    userName: 'Your name',
    matricNum: '123456',
    email: '',
    usertype: 'Retailer',
    storeAdress: ''
};
tabsinfo: any;
userID: any;
  constructor(private userservice: RetailerinfoService, private route: ActivatedRoute, private authservice: AuthService) {

    this.user.email = authservice.currentUserEmail;
    this.tabsinfo = null;
  }

  ngOnInit() {


    this.userID = this.route.snapshot.params['id'];

    if (this.userID) {
      this.loadUser();
    }
  }


  loadUser() {
    this.userservice.getUser(this.userID).subscribe( res => {
      this.user = res;
    });
  }


  saveUser() {

    if (this.userID) {
      this.userservice.UpdateUser(this.user, this.userID).then(() => {
      });
    } else {
       this.userservice.addUser(this.user).then(() => {
       });
    }
  }

  Nextface() {
    this. tabsinfo = 1;
  }

}
