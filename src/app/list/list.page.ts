import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  notification:  any = {
   icon: 'notifications-outline',
   title: 'A voucher is about to expire : CS Log Off Night',
   message: 'Hello Student!! you have not yet redem you voucher of RM 30...',
   date: Date.now()
};

  constructor(private authservice: AuthService) {

  }

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }


  signOut() {
    this.authservice.signOut();
  }

}
