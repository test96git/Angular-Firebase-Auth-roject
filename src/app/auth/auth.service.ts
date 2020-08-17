import { Injectable, NgZone } from '@angular/core';
import { User } from "../shared/models/user";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  constructor(
    public angFirAuth: AngularFireAuth,
    public angFirSt: AngularFirestore,
    public router: Router,
    public ngZone: NgZone
  ) {
    //Update localstorage for signIn & signOut

    this.angFirAuth.authState.subscribe(user => {
      if(user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  //signIn
  signIn(email, password) {
    console.log('signIn tset');
    // return this.angFirAuth.auth.signInWithEmailAndPassword(email, password)
    return this.angFirAuth.signInWithEmailAndPassword(email, password)
      .then((res) =>  {
        this.setUserData(res.user);
        this.angFirAuth.authState.subscribe((user) => {
          if(user) {
            this.ngZone.run(() => {
              console.log('before dashboard tset', user)
              this.router.navigate(['dashboard']);
            });
          }
        })

        // this.setUserData(res.user);
      })
      .catch((error) => {
        window.alert(error.message);
      })

  }

  signUp(email, password) {
    console.log('test', email, password);
    return this.angFirAuth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('signup res is ', res);
        this.sendVerificationEmail();
        this.setUserData(res.user);
      })
      .catch((error) => {
        window.alert(error.message);
      })
  }

  sendVerificationEmail() {
   // return this.angFirAuth.sendEmailVerification()
    return this.angFirAuth.currentUser.then((user) => user.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verifyEmail']);
      })
  }

  forgotPassword(passwordResetEmail) {
    return this.angFirAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Email has been sent to reset your password!');
      })
      .catch((error) => {
        window.alert(error);
      })
  }

  setUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.angFirSt.doc(`users/${user.userId}`);
      const userData: User = {
        userId: user?.userId || null,
        email: user.email,
        displayName: user.displayName,
        emailVerified: user.emailVerified
      }
      return userRef.set(userData, {
        merge: true
      })
    }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  googleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
   return this.angFirAuth.signInWithPopup(provider)
     .then((res) => {
       this.ngZone.run(() => {
         this.router.navigate(['dashboard']);
       });
       this.setUserData(res.user);
     })
     .catch((error) => {
       window.alert(error);
     })
  }

   signOut() {
      return this.angFirAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['signIn'])
      })
   }
}
