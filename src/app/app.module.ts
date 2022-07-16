import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { JourneyComponent } from './journey/journey.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { MatSelectModule } from '@angular/material/select';
import { MainComponent } from './main/main.component';
import { RouteComponent } from './route/route.component';

@NgModule({
  declarations: [AppComponent, JourneyComponent, MainComponent, RouteComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
