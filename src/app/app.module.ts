import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { HomeComponent } from './home/home.component';
import { MasterlistComponent } from './masterlist/masterlist.component';
import { SupplierComponent } from './supplier/supplier.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AuthModalComponent, MasterlistComponent, SupplierComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
