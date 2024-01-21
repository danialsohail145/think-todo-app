import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  db = this.firebaseService.getDatabase()

  profileUrl =
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80';
  signupForm: FormGroup = this.formBuilder.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  signUpuser(email: string, password: string) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        let name = `${this.signupForm.controls['firstname'].value} ${this.signupForm.controls['lastname'].value}`;
        updateProfile(user, { displayName: name, photoURL: this.profileUrl });
        this.signupForm.reset();
        this.profileUrl =
          'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80';
        this.setNewUserDetails(email, { displayName: name });
        this.router.navigate(['/auth/signin']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  saveUser() {
    this.signUpuser(
      this.signupForm.controls['email'].value,
      this.signupForm.controls['password'].value
    );
  }

  async setNewUserDetails(docId: string, data: any) {
    await setDoc(doc(this.db, 'users', docId), data);
  }

  changeImage(event: any) {
    let name = new Date().toISOString();
    let file = event.target.files[0];
    let fileRef = ref(this.firebaseService.getStorage(), `profilepictures/${name}`);
    uploadBytes(fileRef, file).then((snapshot) => {
      getDownloadURL(fileRef).then((res) => {
        this.profileUrl = res;
      });
    });
  }
}
