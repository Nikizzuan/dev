import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { RetailerinfoService } from '../services/retailerinfo.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';


@Component({
  selector: 'app-cuponstat',
  templateUrl: './cuponstat.page.html',
  styleUrls: ['./cuponstat.page.scss'],
})
export class CuponstatPage implements OnInit {
  todos: Todo[];

  userId = null;
  // for userauth
userauth: Observable<firebase.User>;
authState: any = null;
  private subscription: Subscription = new Subscription();
  constructor(private todoService: TodoService, private authservice: AuthService,
    private afAuth: AngularFireAuth,
    private gplus: GooglePlus,
    private userservice: RetailerinfoService,
    private navctr: NavController ) { }


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

     this.todoService.Oninit2(res.storeName);
     this.todoService.getTodos().subscribe( res2 => {
     this.todos = res2;
   });

    });
  }

  remove(item) {
    this.todoService.removeTodo(item.id);
  }

  signOut() {
    this.gplus.logout().then(() => {
      this.authservice.signOut();
    });
}
  addcupon() {
    this.navctr.navigateForward('addcupon');
  }


}
