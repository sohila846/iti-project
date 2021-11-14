import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css']
})
export class AdminDasboardComponent implements OnInit {
 
  userData:any
  constructor(private router : Router,private authService:AuthService) { }

  ngOnInit(): void {
    this.userData=this.getUserInfo()
    console.log( this.userData.email)  }
  onclick(){
    this.router.navigate([`admin-dashboard/manageuser`]);
  }
  onclick2(){
    this.router.navigate([`admin-dashboard/manageproduct`]);
  }
  onclick3(){
    this.router.navigate([`admin-dashboard/managecustomers`]);
  }

  getUserInfo(){
   return this.authService.getuser()

  }
  signOut(){
     this.authService.signOut()
  }
}
