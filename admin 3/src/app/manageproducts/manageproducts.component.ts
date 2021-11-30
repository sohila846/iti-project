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
  selector: 'app-manageproducts',
  templateUrl: './manageproducts.component.html',
  styleUrls: ['./manageproducts.component.css']
})
export class ManageproductsComponent implements OnInit {
products:any
users:any
items:Array<any>=[]
providers:Array<any>=[]
providername:any;
userData:any
displayedColumns=['name','category','provider_name'	,'price',	'status','change_status'	,'Delete']
dataSource!:MatTableDataSource<any>
@ViewChild('paginator') paginator! :MatPaginator;
@ViewChild(MatSort) matSort! :MatSort;
  constructor(private router : Router,private db: Firestore, private authService:AuthService) {
   const dataCollection = collection(db, 'items');
    this.products = collectionData(dataCollection);
    collectionData(dataCollection).subscribe((data:any) => {
      
      // console.log(data);
     this.items=data;
     this.dataSource=new MatTableDataSource(this.items);
     this.dataSource.paginator=this.paginator;
     this.dataSource.sort=this.matSort;
     for(let i in this.items){
       const id=this.items[i].provider_id;
       const relCollection =query(collection(db, 'users'),where("id","==",id)) ;
       collectionData(relCollection).subscribe((data:any) => {
        console.log(data);
        
       this.items[i].provider_id=data[0].name;
       
      })
     }
    })
    const relCollection = collection(db, 'users');
    this.users = collectionData(relCollection);
    collectionData(relCollection).subscribe((data:any) => {
      console.log(data);
     this.providers=data;
     
    })
    
  }
  filterData(e:any){
    this.dataSource.filter=e.target.value;
  }
  ngOnInit(): void {
    this.userData=this.getUserInfo()
  }
  onclick(){
    this.router.navigate([`admin-dashboard/manageuser`]);
  }
  addservice(){
    this.router.navigate([`addservice`]);
  }
  onclick2(){
    this.router.navigate([`admin-dashboard/managecustomers`]);
   
    
  }
  onclick3(){
    this.router.navigate([`admin-dashboard/chart`]);
  }
  addadmin(){
    this.router.navigate([`register`]);
  }
  orders(){
    this.router.navigate([`admin-dashboard/orders`]);
  }
  deleteMovie(id:any){
    if (confirm("Are you sure you want to delete")) {
      deleteDoc(doc(this.db , 'items' , id));
    }
   }
    reject(id:any){
      setDoc(doc(this.db, 'items' , id), {
        status: 'rejected',
      }, { merge : true });
    }
    accept(id:any){
      setDoc(doc(this.db, 'items' , id), {
        status: 'accepted',
      }, { merge : true });
    }
    getUserInfo(){
      return this.authService.getuser()
   
     }
     signOut(){
        this.authService.signOut()
     }
     
}
