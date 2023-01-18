import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from './services/user.service';
import { HttpClient, HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ProfileComponent } from './components/profile/profile.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { LoginplaceService } from './services/loginplace.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MessageService } from './services/message.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DatePipe } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { HttpinterceptorInterceptor } from './interceptors/httpinterceptor.interceptor';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import {MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    UserComponent,
    ProfileEditComponent,
    DashbordComponent,
    ForgotpasswordComponent
  
   
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCommonModule,
    LayoutModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTooltipModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDividerModule,
    MatSnackBarModule,
    MatSidenavModule,
    FormsModule,
    MatListModule,
    MatPaginatorModule
    
    
  ],
  providers: [HttpClient,DatePipe, MessageService, UserService,LoginService,LoginplaceService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorInterceptor, multi: true 
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
