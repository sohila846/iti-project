import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { collection, doc, Firestore, setDoc } from 'firebase/firestore';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {
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
  constructor(private fb: FormBuilder,private router : Router,private authService: AuthService,private firestore: Firestore) { }
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
    this.router.navigate(['admin-dashboard'])
    });
   z.catch(err=>{
     console.log(err);
   });
  }

  ngOnInit(): void {
  }
goback(){}
}
