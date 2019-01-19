import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, NavController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { loginpage } from  './loginpage/loginpage.page'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos: Todo[];
  user: Observable<firebase.User>;
  tabsinfo: any;
  usercheck: any;


  constructor(private todoService: TodoService, private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private platform: Platform, private router: Router, private fireService: AuthService) {
      this.user = fireService.currentUserObservable;
      this.tabsinfo = null; }

  ngOnInit() {

   this.todoService.getTodos().subscribe( res => {
    this.todos = res;
  });

  }

  remove(item) {
    this.todoService.removeTodo(item.id);
    /* if (this.afAuth.auth.onAuthStateChanged) {
      this.navCtrl.navigateForward('loginpage');
    }
    */
  }


  showTransition() {
this. tabsinfo = 1;
  }
  showVoucher() {
    this. tabsinfo = null;
      }

}
