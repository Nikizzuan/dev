import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CuponstorePage } from './cuponstore.page';
import { Todo, TodoService } from '../services/todo.service';

const routes: Routes = [
  {
    path: '',
    component: CuponstorePage
  }
];



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CuponstorePage]
})
export class CuponstorePageModule  {}
