import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-cuponstore',
  templateUrl: './cuponstore.page.html',
  styleUrls: ['./cuponstore.page.scss'],
})
export class CuponstorePage implements OnInit {

  todos: Todo[];
  private subscription: Subscription = new Subscription();

  fabbutton: any;

  constructor(private todoService: TodoService, private authservice: AuthService) { }

  ngOnInit() {

    this.todoService.Oninit();
    this.todoService.getTodos().subscribe( res => {
    this.todos = res;
  });

  }


  remove(item) {
    this.todoService.removeTodo(item.id);
  }

  signOut() {
    this.authservice.signOut();
  }




}
