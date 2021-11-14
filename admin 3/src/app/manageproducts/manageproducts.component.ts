import { Component, OnInit } from '@angular/core';
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


  constructor(private router : Router,private db: Firestore, private authService:AuthService) {
   const dataCollection = collection(db, 'items');
    this.products = collectionData(dataCollection);
    collectionData(dataCollection).subscribe((data:any) => {

      // console.log(data);
     this.items=data;
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
 
  ngOnInit(): void {
    this.userData=this.getUserInfo()
  }
  onclick(){
    this.router.navigate([`admin-dashboard/manageuser`]);
  }
  onclick2(){
    this.router.navigate([`admin-dashboard/managecustomers`]);
   
    
  }
  deleteMovie(id:any){
    deleteDoc(doc(this.db , 'items' , id));}
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
