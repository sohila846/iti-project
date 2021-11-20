import { Component, OnInit, ViewChild } from '@angular/core';
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
  deleteDoc,
} from '@angular/fire/firestore';
import { where, query } from '@firebase/firestore';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  canvas: any;
  ctx: any;
  canvas2: any;
  ctx2: any;
  canvas3: any;
  ctx3: any;
  labelsArray: Array<any> = [];
  allarray: Array<any> = [];
  counterlabel: Array<any> = [];
  labelsArray2: Array<any> = [];
  allarray2: Array<any> = [];
  counterlabel2: Array<any> = [];
  labelsArray3: Array<any> = [];
  allarray3: Array<any> = [];
  counterlabel3: Array<any> = [];
  @ViewChild('mychart') mychart: any;
  @ViewChild('mychart2') mychart2: any;
  @ViewChild('mychart3') mychart3: any;

  ngAfterViewInit() {
   
   
    
    
   
  }

  products: any;
  userData: any;
  items: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private db: Firestore
  ) {
    const dataCollection = collection(db, 'items');
    this.products = collectionData(dataCollection);
    collectionData(dataCollection).subscribe((data: any) => {
      console.log(data[4].quantaty);
      this.items = data;
      for (let i in this.items) {
        if (
          this.allarray.find((data) => 
            (data.name === this.items[i].name)
          )
        ) {
          this.allarray.filter((data) => {
            if (data.name === this.items[i].name) {
              data.counter++;
            }
          })
        } else {
          this.allarray.push({
            name: this.items[i].name,
            counter: 1,
          });
        }
      }
      console.log(this.allarray);
      this.labelsArray=this.allarray.map((date)=>(date.name))
      console.log(this.labelsArray);
      this.counterlabel=this.allarray.map((date)=>(date.counter))
      

    });
    const dataCollection2 = collection(db, 'items');
    this.products = collectionData(dataCollection2);
    collectionData(dataCollection2).subscribe((data: any) => {
     
      this.items = data;
      for (let i in this.items) {
        if (
          this.allarray2.find((data) => 
            (data.category === this.items[i].category)
          )
        ) {
          this.allarray2.filter((data) => {
            if (data.category === this.items[i].category) {
              data.counter++;
            }
          })
        } else {
          this.allarray2.push({
            category: this.items[i].category,
            counter: 1,
          });
        }
      }
      //console.log(this.allarray2);
      this.labelsArray2=this.allarray2.map((date)=>(date.category))
      //console.log(this.labelsArray);
      this.counterlabel2=this.allarray2.map((date)=>(date.counter))
      

    });
    const dataCollection3 = collection(db, 'items');
    this.products = collectionData(dataCollection3);
    collectionData(dataCollection3).subscribe((data:any) => {
     this.items=data;
     for(let i in this.items){
     this.labelsArray3.push(this.items[i].name);
     this.allarray3.push(this.items[i].price);
     }
   
    })
  }

  ngOnInit(): void {
    this.userData = this.getUserInfo();
   
  }
  onclick3() {
    this.router.navigate([`admin-dashboard/manageproduct`]);
  }
  signOut() {
    this.authService.signOut();
  }
  onclick() {
    this.router.navigate([`admin-dashboard/manageuser`]);
  }
  onclick2() {
    this.router.navigate([`admin-dashboard/managecustomers`]);
  }
  getUserInfo() {
    return this.authService.getuser();
  }
  draw(){
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: [...this.labelsArray],
        datasets: [
          {
            label: 'items quantity',
            data: [...this.counterlabel],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
              'rgb(30, 207, 85)',
              'rgb(70, 207, 85)',
              'rgb(90, 207, 85)',
              
            ],
          },
        ],
      },
    });
  }
  draw2(){
    this.canvas2 = this.mychart2.nativeElement;
    this.ctx2 = this.canvas2.getContext('2d');
    new Chart(this.ctx2, {
      type: 'line',

      data: {
        labels: [...this.labelsArray3],
        datasets: [
          {
            label: 'price',
            data: [...this.allarray3],
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
          },
        ],
      },
    });
  }
  draw3(){
    this.canvas3 = this.mychart3.nativeElement;
    this.ctx3= this.canvas3.getContext('2d');
    new Chart(this.ctx3, {
      type: 'bar',
      data: {
          labels:  [...this.labelsArray2],
          datasets: [{
              label: '# of items ',
              data: [...this.counterlabel2],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
     
  });
  }
}
