import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  userLoginForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router){
    this.userLoginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  getAuthenticated(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential:any) => {
        const user = userCredential.user;
        localStorage.setItem('idToken',user.accessToken)
        let userInfo = {
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL
        }
        localStorage.setItem('user', JSON.stringify(userInfo))
        this.router.navigate(['/todo'])
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  loginUser(){
    this.getAuthenticated(this.userLoginForm.value.email, this.userLoginForm.value.password)
  }
}
