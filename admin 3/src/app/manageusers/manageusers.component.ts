import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  Firestore,
  collection,
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
  selector: 'app-manageusers',
  templateUrl: './manageusers.component.html',
  styleUrls: ['./manageusers.component.css']
})
export class ManageusersComponent implements OnInit {
 //users:any
 providers:any
 userData:any
 displayedColumns=['name','email','Delete','profile']
 dataSource!:MatTableDataSource<any>
 @ViewChild('paginator') paginator! :MatPaginator;
 @ViewChild(MatSort) matSort! :MatSort;
//  customers:any
  constructor(private router : Router,private db: Firestore,private authService:AuthService) {
    // const dataCollection = collection(db, 'users');
    // this.users = collectionData(dataCollection);
    const dataCollection =query(collection(db, 'users'),where("cr","!=",null)) ;
    this.providers = collectionData(dataCollection);
    collectionData(dataCollection).subscribe((data) => {
      this.providers=data;
      this.dataSource=new MatTableDataSource(this.providers);
      this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.matSort;
    //   let j=-1;
    //   for(let i in data){
    //     if( data[i].cr){
    //       this.providers[j] =data[i];}
    //       // console.log(this.providers[j]) ;
    //       j++;
      })
     

  //   // });
  //  console.log(this.providers);
  // const Collection =query(collection(db, 'users'),where("phoneNumber","!=",null)) ;
  // this.customers = collectionData(Collection);
   }
   filterData(e:any){
    this.dataSource.filter=e.target.value;
  }
  ngOnInit(): void {
    this.userData=this.getUserInfo()
  }
onclick(){
  this.router.navigate([`admin-dashboard/manageproduct`]);
}
onclick3(){
  this.router.navigate([`admin-dashboard/chart`]);
}
onclick2(){
  this.router.navigate([`admin-dashboard/managecustomers`]);
}
deleteMovie(id:any){
  if (confirm("Are you sure you want to delete!")) {
    deleteDoc(doc(this.db , 'users' , id));
  }
 
}
getUserInfo(){
  return this.authService.getuser()

 }
 signOut(){
    this.authService.signOut()
 }
 profile(userid:any){
   console.log(userid)
  this.router.navigate([`admin-dashboard/providerprofile`],{queryParams:userid});
 }

}
