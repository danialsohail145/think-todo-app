import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { MainComponent } from './components/main/main.component';
import { ContentComponent } from './components/content/content.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    MainComponent,
    ContentComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    NgbModalModule
  ]
})
export class TodoModule { }
