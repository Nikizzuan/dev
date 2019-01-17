import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';

@Component({
  selector: 'app-cuponstore',
  templateUrl: './cuponstore.page.html',
  styleUrls: ['./cuponstore.page.scss'],
})
export class CuponstorePage implements OnInit {

  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe( res => {
    this.todos = res;
  });

  }

  remove(item) {
    this.todoService.removeTodo(item.id);
  }
}
