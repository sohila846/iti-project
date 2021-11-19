import { Component, OnInit,ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Chart } from 'chart.js';
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
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  canvas: any;
  ctx: any;
  canvas2: any;
  ctx2: any;
  canvas3: any;
  ctx3: any;
  labelsArray = [];
  dataArray = [];

  
  @ViewChild('mychart') mychart:any;
  @ViewChild('mychart2') mychart2:any;
  @ViewChild('mychart3') mychart3:any;


  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');
    this.canvas2 = this.mychart2.nativeElement; 
    this.ctx2 = this.canvas2.getContext('2d');
    this.canvas3 = this.mychart3.nativeElement; 
    this.ctx3 = this.canvas3.getContext('2d');

    new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          
        }]
      },
  });
  new Chart(this.ctx2, {
    type: 'line',
    
    data: {
      labels:['jan','feb','march'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
       
      }]
    },
});
new Chart(this.ctx3, {
  type: 'bar',
  
  data:{
    labels: ['jan','feb','march','april'],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)','rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  },
});
}
  

products:any
  userData:any
  price:any
  constructor(private router : Router,private authService:AuthService,private db: Firestore) { 
    const dataCollection = collection(db, 'items');
    this.products = collectionData(dataCollection);
    collectionData(dataCollection).subscribe((data:any) => {

      //console.log(data);
      
    
    })
  }

  ngOnInit(): void {
    this.userData=this.getUserInfo()
  }
  onclick3(){
    this.router.navigate([`admin-dashboard/manageproduct`]);
  }
  signOut(){
    this.authService.signOut()
 }
  onclick(){
    this.router.navigate([`admin-dashboard/manageuser`]);
  }
  onclick2(){
    this.router.navigate([`admin-dashboard/managecustomers`]);
   
    
  }
  getUserInfo(){
    return this.authService.getuser()
 
   }
}
