import { Component, OnInit } from '@angular/core';
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
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-manageproviders',
  templateUrl: './manageproviders.component.html',
  styleUrls: ['./manageproviders.component.css']
})
export class ManageprovidersComponent implements OnInit {
  customers:any
  userData:any
  constructor(private router : Router,private db2: Firestore,private authService:AuthService) { 
    const Collection =query(collection(db2, 'users'),where("phoneNumber","!=",null)) ;
    this.customers = collectionData(Collection);
    
  }
  

  ngOnInit(): void {
    this.userData=this.getUserInfo()
  }
 onclick(){
  this.router.navigate([`admin-dashboard/manageuser`]);
 }
 onclick2(){
  this.router.navigate([`admin-dashboard/manageproduct`]);
 }
 delete(id:any){
  deleteDoc(doc(this.db2 , 'users' , id));
 }
 getUserInfo(){
  return this.authService.getuser()

 }
 signOut(){
    this.authService.signOut()
 }
}
