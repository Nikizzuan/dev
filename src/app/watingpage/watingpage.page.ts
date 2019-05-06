import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watingpage',
  templateUrl: './watingpage.page.html',
  styleUrls: ['./watingpage.page.scss'],
})
export class WatingpagePage implements OnInit {


  date = Date.now();

  constructor() { }

  ngOnInit() {

    /*
    this.userservice.getUser(this.userID).subscribe( res => {
    if (res.usertype === 'Retailer' ) {
      if (res.approval === 'unapprove') {
      } else {
//

    }
  }
  });
*/

  }



}
