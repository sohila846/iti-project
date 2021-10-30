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

  constructor(
    private auth: Auth
  ) {    
    this.user$ = user(auth);
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
}