import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { FirebaseService } from 'src/app/services/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  db = this.firebaseService.getDatabase();
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();
  @Input() userEmail: string = '';
  @Input() isEdit: boolean = false;
  @Input() editData: any = '';

  quillText: any = '';
  todoTitle: string = '';
  todoContent = '';

  modules: any = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      [{ header: 1 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],

      ['clean'],
    ],
  };

  constructor(private firebaseService: FirebaseService) {}
  ngOnInit(): void {
    if (this.isEdit) {
      this.todoTitle = this.editData.title;
      this.todoContent = this.editData.content;
    }
  }

  saveNote() {
    if (this.isEdit) {
      this.updateTodo();
    } else {
      this.addTodo();
    }
    this.closeModalDialog();
  }

  async updateTodo() {
    const querySnapshot = await updateDoc(
      doc(this.db, `users/${this.userEmail}/todo`, this.editData.id),
      { title: this.todoTitle, content: this.quillText }
    );
  }

  async addTodo() {
    const querySnapshot = await addDoc(
      collection(this.db, `users/${this.userEmail}/todo`),
      { title: this.todoTitle, content: this.quillText }
    );
  }

  changeText(e: any) {
    this.quillText = e.html;
  }

  onEditorCreated(quill: any) {
    let delta = quill.clipboard.convert(this.todoContent);
    quill.setContents(delta, 'user');
  }

  closeModalDialog() {
    this.closeModal.emit(true);
  }
}
