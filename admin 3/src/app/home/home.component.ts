import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public isCollapsed = true;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  login(){
    this.router.navigate([`login`]);
  }
  register(){
    this.router.navigate([`register`]);
  }

}
