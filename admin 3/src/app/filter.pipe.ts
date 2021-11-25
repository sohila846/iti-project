import { Pipe, PipeTransform } from '@angular/core';
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
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  value:any;
  transform(customers: Array<any> = [], ...args: unknown[]): unknown {
    return this.value ? customers.filter((item: { name: unknown; }) => item.name === this.value) : customers;
  }

}
