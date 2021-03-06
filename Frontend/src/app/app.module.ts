import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guard/Auth.guard';
import { MonCompteComponent } from './mon-compte/mon-compte.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { SondageService } from './services/sondage.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogSondageComponent } from './dialog/dialogSondage.component';
import { MatNativeDateModule } from '@angular/material';
import { VoteService } from './services/vote.service';


@NgModule({
  declarations: [
    AppComponent,
    DialogSondageComponent,
    HomeComponent,
    AuthComponent,
    MonCompteComponent,
    CreateProfileComponent
   
  ],
  entryComponents: [DialogSondageComponent
  ],
  imports: [
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatChipsModule,
    MatStepperModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule
  ],
  
  providers: [
    AuthService,
    SondageService,
    VoteService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
