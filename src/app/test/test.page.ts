import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { TransactionService, Transaction } from '../services/transaction.service';
import { Observable } from 'rxjs/Observable';
import { Chart } from 'chart.js';
import { RetailerinfoService, Userinfo } from '../services/retailerinfo.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  data: Observable<any[]>;
  alltransaction: Transaction[];
  userId = null;
userinfos: Userinfo;
 userauth: Observable<firebase.User>;

 authState: any = null;
  transaction:  Transaction = {
    icon: '',
    icon2: '',
    title: '',
    date: Date.now(),
    color: '',
    expense:  true,
    amount: 0,
    month: 0,
    Userid: '',
    retailer: '',

 };

 totalchartData = null;

 months = [
  {value: 0, name: 'January'},
  {value: 1, name: 'February'},
  {value: 2, name: 'March'},
  {value: 3, name: 'April'},
  {value: 4, name: 'May '},
  {value: 5, name: 'June'},
  {value: 6, name: 'July'},
  {value: 7, name: 'August '},
  {value: 8, name: 'September '},
  {value: 9, name: 'October '},
  {value: 10, name: 'November'},
  {value: 11, name: 'December'},
];

  @ViewChild('valueBarsCanvas') valueBarsCanvas;
  valueBarsChart: any;

  constructor(public navCtrl: NavController,
    private transactionservice: TransactionService,
    private afAuth: AngularFireAuth,
    private userservice: RetailerinfoService,
    private toastCtrl: ToastController) { }

  ngOnInit() {

    this.userauth = this.afAuth.authState;

    this.afAuth.auth.onAuthStateChanged(user =>  {
      this.userId = user.uid;
      if (this.userId) {
        this.loadTodo();

      }
    });

  }

  loadTodo() {
    this.userservice.getUser(this.userId).subscribe( res => {
      this.userinfos = res;

      this.loadtranscation(res.email);

    });
  }


  loadtranscation(email: any) {

    this.transactionservice.getCollectionoTtran(email).subscribe( res => {
        this.createCharts(res);
      });

}

getReportValues() {
  const reportByMonth = {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null
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
        backgroundColor: '#ff6384'
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

}
