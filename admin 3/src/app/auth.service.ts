import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import {
  Auth,
  signOut,
  signInWithPopup,
  user,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  sendPasswordResetEmail,
  getAdditionalUserInfo,
  OAuthProvider,
  User,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user$: Observable<User | null> | undefined;
  userstate:any
  
  constructor(
    private auth: Auth,
    private router:Router
  ) {    
    this.user$ = user(auth);
    this.auth.onAuthStateChanged(user=>{if(user){
      this.userstate=user
      //console.log(this.userstate)
     localStorage.setItem('user',JSON.stringify(this.userstate))
    }})

  
  }
  isLoggedIn(){
    //const user=localStorage.getItem('user');
    if(window.localStorage.length !==0){
     //console.log( this.auth.currentUser);
     return true;
    }
      //console.log("whathappend")
      return false;
    
  }
  isLoggedout(){
    //const user=localStorage.getItem('user');
    if(window.localStorage.length !==0){
     //console.log( this.auth.currentUser);
     return false;
    }
      //console.log("whathappend")
      return true;
    
  }
  async emailLogin(email: string, password: string)
  : Promise<any> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  
  }
  async emailSignUp(email: string, password: string)
: Promise<void> {

  const credential = await createUserWithEmailAndPassword(
    this.auth,
    email,
    password
  );
  await updateProfile(
    credential.user, { displayName: credential.user.displayName }
  );
  await sendEmailVerification(credential.user);

 
  
}

async resetPassword(email: string): Promise<any> {

  // sends reset password email
  await sendPasswordResetEmail(this.auth, email);
  
}

async oAuthLogin(p: string): Promise<void> {

  // get provider, sign in
  const provider = new OAuthProvider(p);
  const credential = await signInWithPopup(this.auth, provider);
  const additionalInfo = getAdditionalUserInfo(credential);

  // create user in db
  if (additionalInfo?.isNewUser) {
    
  }
  
  }
  getuser(){
    return JSON.parse(window.localStorage.getItem('user')!)
  }
  async signOut(){
    signOut(this.auth).then(()=>{
      localStorage.removeItem('user')
      //navigate
      this.router.navigate(['login'])
    })
  }
}