import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from '../services/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addcupon',
  templateUrl: './addcupon.page.html',
  styleUrls: ['./addcupon.page.scss'],
})
export class AddcuponPage implements OnInit {

todo: Todo = {
    CuponName: 'Test cuppon',
    Expiredate: new Date().getTime(),
    CreatedAt: new Date().getTime()
};

todoId = null;
  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.todoId = this.route.snapshot.params['id'];

    if (this.todoId) {
      this.loadTodo();
    }
  }

  loadTodo() {
    this.todoService.getTodo(this.todoId).subscribe( res => {
      this.todo = res;
    });
  }


  saveTodo() {


    if (this.todoId) {
      this.todoService.Updatetod(this.todo, this.todoId).then(() => {
      });
    } else {
       this.todoService.addTodo(this.todo).then(() => {
       });
    }
  }

}
