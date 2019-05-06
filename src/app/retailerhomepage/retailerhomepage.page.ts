import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Chart } from 'chart.js';
import { ToastController } from '@ionic/angular/dist/providers/toast-controller';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from '../services/fcm.service';
import { Transaction, TransactionService } from '../services/transaction.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { RetailerinfoService, Userinfo } from '../services/retailerinfo.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-retailerhomepage',
  templateUrl: './retailerhomepage.page.html',
  styleUrls: ['./retailerhomepage.page.scss'],
})
export class RetailerhomepagePage implements OnInit {
  tabsinfo: any;

  data: Observable<any[]>;

  transaction:  Transaction = {
    icon: '',
    icon2: '',
    title: '',
    amount: 0,
    date: Date.now(),
    color: 'greeen',
    expense:  null,
    month: 0,
    Userid: '',
    retailer: '',

 };

 userinfos: Userinfo = {
  userName: '',
  matricNum: '',
  email: '',
  usertype: '',
  storeAdress: '',
  storeName: '',
  University: '',
  UniversirtyPoint: 0,
  myeventplaner: '',
  myqrplaner: '',
  StoreLocid: '',
  eWallet: 0,
  academicYear: '',
  storeUniqeID: '',
  storetype: '',
  approval: 'unapprove',
  date: Date.now()
 };



 alltransaction: Transaction[];
 userId = null;
 // for userauth
userauth: Observable<firebase.User>;
authState: any = null;


  constructor(private authservice: AuthService,
    private toastCtrl: ToastController,
    private platform: Platform,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private userservice: RetailerinfoService,
    private transcationservice: TransactionService,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    ) {
   // this.initializeApp();
     }

     totalchartData = null;

     months = [
      {value: 0, name: 'January'},
      {value: 1, name: 'February'},
      {value: 2, name: 'March'},
      {value: 3, name: 'April'},
    ];

      @ViewChild('valueBarsCanvas') valueBarsCanvas;
      valueBarsChart: any;

      totaldonationmonth = 0;
      totaldonationlastmonth = 0;
      totaldonationyear = 0;
      percentageDonation = 0;


  ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {
      this.userId = user.uid;
      if (this.userId) {
        this.loadTodo();

      }
    });

  }




  signOut() {
     this.gplus.logout().then(() => {
        this.authservice.signOut();
      });
  }


  showTransition() {
this. tabsinfo = 1;

  }
  showVoucher() {
    this. tabsinfo = null;
    this.loadtranscation( this.userinfos.email);
      }


      // transcation

      loadTodo() {
        this.userservice.getUser(this.userId).subscribe( res => {
          this.userinfos = res;

          this.loadtranscation(res.email);

        });
      }

      loadtranscation(email: any) {

      this.transcationservice.getCollectionoTtran(email).subscribe( res => {
          this.alltransaction = res;
          this.createCharts(res);
        });

      }


      // chart js start here

      getReportValues() {
        const reportByMonth = {
          0: null,
          1: null,
          2: null,
          3: null
        };

        for (const trans of this.totalchartData) {
          if (reportByMonth[trans.month]) {
            if (trans.expense) {
              reportByMonth[trans.month] -= +trans.amount;
            } else {
              reportByMonth[trans.month] += +trans.amount;
            }
          } else {
            if (trans.expense) {
              reportByMonth[trans.month] = 0 - +trans.amount;
            } else {
              reportByMonth[trans.month] = +trans.amount;
            }
          }
        }
        return Object.keys(reportByMonth).map(a => reportByMonth[a]);

      }




      updateCharts(data) {

        this.loaddonationyear(data);
        this.loaddonatiomonth(data);
        this.loaddonatiolastmonth(data);
        this.calculategrothrate();
        this.totalchartData = data;
        const chartData = this.getReportValues();
              // Update our dataset
        this.valueBarsChart.data.datasets.forEach((dataset) => {
          dataset.data = chartData;
        });
        this.valueBarsChart.update();
      }

      createCharts(data) {

        this.loaddonationyear(data);
        this.loaddonatiomonth(data);
        this.loaddonatiolastmonth(data);
        this.calculategrothrate();
        this.totalchartData = data;
// Calculate Values for the Chart
        const chartData = this.getReportValues();

        // Create the chart
        this.valueBarsChart = new Chart(this.valueBarsCanvas.nativeElement, {
          type: 'bar',
          data: {
            labels: Object.keys(this.months).map(a => this.months[a].name),
            datasets: [{
              data: chartData,
              backgroundColor: '#32db64'
            }]
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              callbacks: {
                // tslint:disable-next-line:no-shadowed-variable
                label: function (tooltipItems, data) {
                  return 'RM ' + data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] ;
                }
              }
            },
            scales: {
              xAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }],
              yAxes: [{
                ticks: {
                  callback: function (value, index, values) {
                    return  'RM ' + value ;
                  },
                  suggestedMin: 0
                }
              }]
            },
          }
        });
      }


      loaddonationyear(array: any) {
        this.totaldonationyear = 0;
        for (let index = 0; index < array.length; index++) {
            this.totaldonationyear =  this.totaldonationyear + array[index].amount;

        }

      }


      loaddonatiomonth(array: any) {
        this.totaldonationmonth = 0;
        for (let index = 0; index < array.length; index++) {

            if (array[index].month === new Date().getMonth()) {
              this.totaldonationmonth = this.totaldonationmonth + array[index].amount;
            }
        }

      }

      loaddonatiolastmonth(array: any) {
        this.totaldonationlastmonth = 0;
        for (let index = 0; index < array.length; index++) {

            if (array[index].month === (new Date().getMonth() - 1)) {
              this.totaldonationlastmonth = this.totaldonationlastmonth + array[index].amount;
            }
        }

      }

      calculategrothrate() {

        if (this.totaldonationlastmonth > 0) {
          this.percentageDonation = this.totaldonationmonth - this.totaldonationlastmonth;
          this.percentageDonation  =  this.percentageDonation / this.totaldonationlastmonth;
          this.percentageDonation = this.percentageDonation  * 100;
        } else {
          this.percentageDonation = 0;
        }



      }



}
