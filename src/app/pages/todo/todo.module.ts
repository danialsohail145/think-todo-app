import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { MainComponent } from './components/main/main.component';
import { ContentComponent } from './components/content/content.component';
import { QuillModule } from 'ngx-quill'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    QuillModule.forRoot(
     
    )
  ]
})
export class TodoModule { }
