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
    ManageprovidersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
