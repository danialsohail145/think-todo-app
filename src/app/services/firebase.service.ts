import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private app = initializeApp(environment.firebaseConfig);
  private storage = getStorage(this.app, 'gs://think-todo.appspot.com');

  private db = getFirestore(this.app);
  constructor() {}

  getDatabase() {
    return this.db;
  }
  getStorage() {
    return this.storage;
  }
}
