import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDasboardComponent } from './admin-dasboard/admin-dasboard.component';
import { ManageusersComponent } from './manageusers/manageusers.component';
import { ManageproductsComponent } from './manageproducts/manageproducts.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { ManageprovidersComponent } from "./manageproviders/manageproviders.component";
import { getAuth, provideAuth } 
from '@angular/fire/auth';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MatSliderModule } from '@angular/material/slider'
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsComponent } from './charts/charts.component';
import { ProvideprofileComponent } from './provideprofile/provideprofile.component';
import { FilterPipe } from './filter.pipe';
import{MatTableModule}from '@angular/material/table';
import{MatPaginatorModule}from '@angular/material/paginator';
import{MatSortModule}from '@angular/material/sort';
import{MatFormFieldModule}from '@angular/material/form-field';
import{MatInputModule}from '@angular/material/input';
import "@angular/compiler";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    FooterComponent,
    AdminDasboardComponent,
    ManageusersComponent,
    ManageproductsComponent,
    ManageprovidersComponent,
    ChartsComponent,
    ProvideprofileComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
     
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
