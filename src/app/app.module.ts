import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './components/app.component';
import { HttpModule }   from '@angular/http';
import {Routes, RouterModule} from '@angular/router';

@NgModule({
  imports:      [ BrowserModule, FormsModule,HttpModule],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
