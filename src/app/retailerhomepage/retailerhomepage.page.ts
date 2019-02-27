import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Chart } from 'chart.js';
import { ToastController } from '@ionic/angular/dist/providers/toast-controller';
import { Observable } from 'rxjs';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FcmService } from '../services/fcm.service';

@Component({
  selector: 'app-retailerhomepage',
  templateUrl: './retailerhomepage.page.html',
  styleUrls: ['./retailerhomepage.page.scss'],
})
export class RetailerhomepagePage implements OnInit {
  tabsinfo: any;

  data: Observable<any[]>;


  transition:  any = {
    icon: 'arrow-round-down',
    icon2: 'remove',
    title: 'Food and beverages',
    amount: '07.00',
    date: Date.now(),
    color: 'red'

 };

 months = [
  {value: 0, name: 'January'},
  {value: 1, name: 'February'},
  {value: 2, name: 'March'},
  {value: 3, name: 'April'},
];

transaction = {
  value: 0,
  expense: false,
  month: 0
};

 @ViewChild('valueBarsCanvas') valueBarsCanvas;
 valueBarsChart: any;

 chartData = null;

  constructor(private authservice: AuthService,
    private toastCtrl: ToastController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    ) {
   // this.initializeApp();
     }


  ngOnInit() {

        // Reference to our Firebase List
  //      this.ref = this.db.list('transactions', ref => ref.orderByChild('month'));

        // Catch any update to draw the Chart

         //   this.createCharts(this.transaction);

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

      createCharts(data) {
        this.chartData = data;

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
                    return value + '$';
                  },
                  suggestedMin: 0
                }
              }]
            },
          }
        });
      }

      getReportValues() {
        const reportByMonth = {
          0: null,
          1: null,
          2: null,
          3: null
        };

        for (const trans of this.chartData) {
          if (reportByMonth[trans.month]) {
            if (trans.expense) {
              reportByMonth[trans.month] -= +trans.value;
            } else {
              reportByMonth[trans.month] += +trans.value;
            }
          } else {
            if (trans.expense) {
              reportByMonth[trans.month] = 0 - +trans.value;
            } else {
              reportByMonth[trans.month] = +trans.value;
            }
          }
        }
        return Object.keys(reportByMonth).map(a => reportByMonth[a]);
      }


}
