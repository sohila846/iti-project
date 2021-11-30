import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// import { DecimalPipe } from '@angular/common';
// import { FormControl } from '@angular/forms';

import {
  collection,
  Firestore,
  collectionData,
  doc,
  docData,
  setDoc,
  deleteDoc 
} from '@angular/fire/firestore';
import { where,query } from '@firebase/firestore';
import { AuthService } from '../auth.service';
import{MatTableDataSource}from '@angular/material/table';
import{MatPaginator}from '@angular/material/paginator';
import{MatSort}from '@angular/material/sort';
@Component({
  selector: 'app-manageproviders',
  templateUrl: './manageproviders.component.html',
  styleUrls: ['./manageproviders.component.css']
})
export class ManageprovidersComponent implements OnInit{
  customers:any
  userData:any
  //filter = new FormControl('');
  displayedColumns=['name','email','phone','Delete']
  dataSource!:MatTableDataSource<any>
  @ViewChild('paginator') paginator! :MatPaginator;
  @ViewChild(MatSort) matSort! :MatSort;
  constructor(private router : Router,private db2: Firestore,private authService:AuthService) { 
    // var name=document.getElementById("selectname");
    // var selected=name?.textContent;
    const Collection =query(collection(db2, 'users'),where("phone","!=",null)) ;
    this.customers = collectionData(Collection);
    
    collectionData(Collection).subscribe((data:any) => {
      this.customers=data;
      this.dataSource=new MatTableDataSource(this.customers);
      this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.matSort;
    })
    
    
  }
  // search({ text, pipe }: { text: string; pipe: PipeTransform; }) {
  //   return this.customers.filter((customer: { name: string; area: any; population: any; }) => {
  //     const term = text.toLowerCase();
  //     return customer.name.toLowerCase().includes(term)
  //         || pipe.transform(customer.area).includes(term)
  //         || pipe.transform(customer.population).includes(term);
  //   });
  // }
  ngOnInit(): void {
    this.userData=this.getUserInfo()
  }
  addadmin(){
    this.router.navigate([`register`]);
  }
  orders(){
    this.router.navigate([`admin-dashboard/orders`]);
  }
  filterData(e:any){
    this.dataSource.filter=e.target.value;
  }
 onclick(){
  this.router.navigate([`admin-dashboard/manageuser`]);
 }
 addservice(){
  this.router.navigate([`addservice`]);
}
 onclick2(){
  this.router.navigate([`admin-dashboard/manageproduct`]);
 }
 onclick3(){
  this.router.navigate([`admin-dashboard/chart`]);
 }
 delete(id:any){
  if (confirm("Are you sure you want to delete")) {
    deleteDoc(doc(this.db2 , 'users' , id));
  }
  
 }
 getUserInfo(){
  return this.authService.getuser()

 }
 signOut(){
    this.authService.signOut()
 }
}
