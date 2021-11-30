import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.css']
})
export class AddserviceComponent implements OnInit {
  userData:any
  userInfo:any
  userName:any
  product:any
  models:[{name:string,id:string,brand_id:string}]=[{name:"",id:"",brand_id:""}]
  my:[{name:string,id:string,brand_id:string}]=[{name:"",id:"",brand_id:""}]
  servics:[{name:string,id:string}]=[{name:"",id:""}]
  isAddMode:boolean=true;
 
  moviesForm=new FormGroup({
  carmodelid:new FormControl("",[Validators.required]),
  serviceid:new FormControl("",[Validators.required]), 
  priod:new FormControl("",[Validators.required]), 
 },
 
 
 )
 
 ;
 get moviesFormControls() {
  return this.moviesForm.controls;
}
  constructor(private router : Router,private db: Firestore,private fb: FormBuilder,private authService: AuthService,private route:ActivatedRoute) { 
      
    collectionData(collection(this.db,'car model')).subscribe(data=>{
      let i=0;
      for( let item in data){
      this.models[item]={name:data[item].name,id:data[item].id,brand_id:data[item].brand_id};
      console.log( this.models[item])  
      }
    });
    collectionData(collection(this.db,'services')).subscribe(data=>{
      let i=0;
      for( let item in data){
      this.servics[item]={name:data[item].name,id:data[item].id};
      console.log( this.servics[item])  
      
      }})
    
  }
  submitReactiveForm() {
    console.log(this.moviesForm);
  
 
           const myDoc=doc(collection(this.db, 'periods'));
             setDoc(myDoc,{
               
               model_id:this.moviesForm.value["carmodelid"],
               service_id:this.moviesForm.value["serviceid"],
               period:this.moviesForm.value["priod"],
               id:myDoc.id,
             
             });
             // alert("dooooooone");
             console.log(myDoc);
         
       
   
   console.log("done");
 // this.router.navigate([`admin-dashboard/manageproduct`]);
}
  ngOnInit(): void {
  }
  goback(){
    this.router.navigate([`admin-dashboard/chart`]);
  }
}
