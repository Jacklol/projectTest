import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './components/app.component';
import { HttpModule }   from '@angular/http';
import { Routes, RouterModule} from '@angular/router';
import { DragulaModule } from 'ng2-dragula';
import { AgmCoreModule} from '@agm/core';
@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, DragulaModule, AgmCoreModule, AgmCoreModule.forRoot({
    apiKey: 'AIzaSyA51SdDQgsoGnOzVrmzSDVDTJTBLtbaIEM'
  })],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
