import { Component} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  moviesForm=new FormGroup({
    myname:new FormControl("",Validators.required),
    password:new FormControl
    ("",[Validators.required,Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
    email:new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]),
    conpassword:new FormControl("",[Validators.required]),
    username:new FormControl("",[Validators.required,Validators.pattern("^[-a-zA-Z0-9-()]+(\S+[-a-zA-Z0-9-()]+)*$")])
  },
  // {
  //   validator:ConfirmedValidator('password', 'conpassword')
  // }

  )

  ;
 
  

  

  get moviesFormControls() {
    return this.moviesForm.controls;
  }

  constructor(private fb: FormBuilder,private router : Router,private authService: AuthService,private firestore: Firestore){
    
  }
  submitReactiveForm(email:any,password:any,name:any,username:any) {
    const z=this.authService.emailSignUp(email,password);
    z.then(value =>{
    const myDoc=doc(collection(this.firestore, 'users'));
       setDoc(myDoc,{
      email: email,
      name: name,
      password:password,
      username:username,
      id:myDoc.id
    });
   window.alert("done");
    });
   z.catch(err=>{
     console.log(err);
   });
  }
 
goback(){
  this.router.navigate([`admin-dashboard/chart`]);
}
}
