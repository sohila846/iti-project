import { Component, OnInit,ViewChild } from '@angular/core';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

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
import{MatTableDataSource}from '@angular/material/table';
import{MatPaginator}from '@angular/material/paginator';
import{MatSort}from '@angular/material/sort';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  items:any
  // orders !:[{id:string,name:string,number:number,isavilable:boolean,imag:string,category:string,price:number,quantaty:number}]
   $orders:any
   userData:any
  userInfo:any
  displayedColumns=['name','category','price','quantity','image']
  dataSource!:MatTableDataSource<any>
  @ViewChild('paginator') paginator! :MatPaginator;
  @ViewChild(MatSort) matSort! :MatSort;
  constructor(private router : Router,private authService:AuthService,private db: Firestore) {
    this.userData=this.authService.getuser();
    const data=query(collection(this.db,'users'),where("email","==",this.userData.email));
    collectionData(data).subscribe(data=>{
    this.userInfo=data[0];
    console.log( data[0])
    const dataCollection = collection(this.db, 'orders');
    collectionData(dataCollection).subscribe(data=>{
      this.items=data;
     
     console.log(data)
     const x=[];
      for(let i in data){ 
        // console.log(data[i].cartItems[0].item); 
        console.log(data[i].cartItems)
        if(data[i].cartItems.length>0){
          for(let j=0;j<data[i].cartItems.length;j++){
       
         
       x.push(data[i].cartItems[j]);
       this.dataSource=new MatTableDataSource(x);
       this.dataSource.paginator=this.paginator;
     this.dataSource.sort=this.matSort;
       console.log(data[i].cartItems[j].item);  
      //  this.orders.push({id:'',
      //  name:this.items[i].cartItems[0].item.name
      //  ,number:this.items[i].cartItems[0].item.number
      //  ,isavilable:true,price:this.items[i].cartItems[0].item.price
      //  ,imag:this.items[i].cartItems[0].item.imag
      //  ,category:""
      //  ,quantaty:0
      // });
        // this.orders[j]=data[i].cartItems[0].item;
       
      } 
      }
 
      }
      this.$orders=x;
        console.log(this.$orders );
      })
    }) 
   }

  ngOnInit(): void {
    
  }
  filterData(e:any){
    this.dataSource.filter=e.target.value;
  }
  addservice(){
    this.router.navigate([`addservice`]);
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
  signOut(){
    this.authService.signOut()
 }
 addadmin(){
  this.router.navigate([`register`]);
}
  

}
