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
  academicYear: ''
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
    this.authservice.signOut();
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
        this.totalchartData = data;
        const chartData = this.getReportValues();
              // Update our dataset
        this.valueBarsChart.data.datasets.forEach((dataset) => {
          dataset.data = chartData;
        });
        this.valueBarsChart.update();
      }

      createCharts(data) {
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
                  return data.datasets[tooltipItems.datasetIndex].data[tooltipItems.index] + ' $';
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



}
