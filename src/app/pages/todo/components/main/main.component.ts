import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { TodoModel } from 'src/app/model/todo.model';
import { AuthService } from 'src/app/services/auth.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  openModal: boolean = false;
  userData: any = '';
  db = this.firebaseService.getDatabase();

  todoList: TodoModel[] = [];
  isEdit: boolean = false;

  editData: any = '';
  showDropDown: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
    this.userData = this.authService.getAuthUserData();
  }
  ngOnInit(): void {
    this.getTodoList();
  }

  async getTodoList() {
    this.todoList = [];
    const querySnapshot = await getDocs(
      collection(this.db, `users/${this.userData.email}/todo`)
    );
    querySnapshot.forEach((doc: any) => {
      let data: TodoModel = doc.data();
      data.id = doc.id;
      this.todoList.push(data);
    });
  }

  checkModalEvent(event: any) {
    this.openModal = !event;
    if (!this.openModal) {
      this.getTodoList();
    }
  }

  addNewTodo() {
    this.isEdit = false;
    this.open();
  }

  open() {
    this.openModal = !this.openModal;
  }

  async getDocument(docId: any) {
    const docRef = doc(this.db, `users/${this.userData.email}/todo`, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return false;
    }
  }

  async editTodo(todo: TodoModel) {
    this.editData = await this.getDocument(todo.id);
    this.editData.id = todo.id;
    this.isEdit = true;
    this.open();
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/auth/signin']);
  }
}
