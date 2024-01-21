import { Component } from '@angular/core';
import { initializeApp } from '@angular/fire/app';
import { getAuth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-list';
  ngOnInit(): void {
  
  }
}
