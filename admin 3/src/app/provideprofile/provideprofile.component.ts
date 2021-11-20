import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

@Component({
  selector: 'app-provideprofile',
  templateUrl: './provideprofile.component.html',
  styleUrls: ['./provideprofile.component.css']
})
export class ProvideprofileComponent implements OnInit {
provider:any;
selected = 0;
hovered = 0;
readonly = false;
items:any;
  constructor(private router : Router,private route:ActivatedRoute,private db: Firestore) { 
    this.provider=this.route.snapshot.queryParams;
    console.log( this.provider.name)
    const dataCollection = query(collection(this.db, 'items'),where("provider_id","==", this.provider.id));
    collectionData(dataCollection).subscribe(data=>{
      this.items=data;
      console.log(this.items);
    })
  }

  ngOnInit(): void {
  }
  goback(){
    this.router.navigate([`admin-dashboard/manageuser`]);
  }

}
