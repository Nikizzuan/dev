import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QRrequestService, Qrdata } from '../services/qrrequest.service';

@Component({
  selector: 'app-purchasedetail',
  templateUrl: './purchasedetail.page.html',
  styleUrls: ['./purchasedetail.page.scss'],
})
export class PurchasedetailPage implements OnInit {

  Date: any = '';
  transcationid: any;
  qrcode: any = null;

  qrdata: Qrdata = {
  RequestID: '',
  CustomerEmail: '',
  RetailerEmail: '',
  BillDue: null,
  QrStatus: '',
  CustomerName: '',
  QrCode: '',
  VoucherID: '',
  retailerID: ''
  };

  constructor(private route: ActivatedRoute,
              private qrservice: QRrequestService) {


    this.transcationid = this.route.snapshot.params['id'];

   if (this.transcationid) {

     this.load(this.transcationid);
   }

  }

  ngOnInit() {
  }

  accepttransaction() {
     this.qrcode = 'qrcode' +  this.qrdata.RequestID;
     this.qrcode =  this.qrcode.replace(' ', '');
    this.sentconfimation();
  }

  load(id: any) {
    this.qrservice.getQrdata(id).subscribe( res => {
      this.qrdata = res;
    } );
  }


  sentconfimation() {
     console.log('push notifie buyer ' + this.qrcode);
     this.qrdata.QrStatus = 'Acception';
     this.qrdata.RequestID = this.qrdata.RequestID + 'v2';
     this.qrdata.QrCode = this.qrcode;
     this.qrservice.addQrdata(this.qrdata).then(() => {
    });
  }
}
