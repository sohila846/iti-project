import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  invalid:any

  moviesForm=new FormGroup({
   
    password:new FormControl
    ("",[Validators.required,Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
    email:new FormControl("",[Validators.required,Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]),
   
    
  },
  // {
  //   validator:ConfirmedValidator('password', 'conpassword')
  // }

  )

  ;
 
  

  

  get moviesFormControls() {
    return this.moviesForm.controls;
  }

  constructor(private fb: FormBuilder,private router : Router,private authService: AuthService){
    console.log(this.authService.isLoggedIn())
  }
  submitReactiveForm(email:any,password:any) {
    
    const z=this.authService.emailLogin(email,password)
    z.then(value => {
      console.log('Nice, it worked!');
      this.router.navigate([`admin-dashboard/chart`]);
    })
    z.catch(err => {
      //console.log('Something went wrong: ', err.message);
      this.invalid="invalid email or password"
      this.router.navigate([`login`]);
    });
    
    
   
    
  }
  onclick(){
    this.router.navigate([`login-register`]);
  }
}
