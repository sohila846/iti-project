import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css']
})
export class AdminDasboardComponent implements OnInit {
 
  
  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  onclick(){
    this.router.navigate([`admin-dashboard/manageuser`]);
  }
  onclick2(){
    this.router.navigate([`admin-dashboard/manageproduct`]);
  }
  onclick3(){
    this.router.navigate([`admin-dashboard/managecustomers`]);
  }
}
