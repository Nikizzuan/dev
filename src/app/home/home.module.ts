import { NgModule, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ListPage } from '../list/list.page';
import { Todo, TodoService } from '../services/todo.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})



export class HomePageModule implements OnInit {
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
