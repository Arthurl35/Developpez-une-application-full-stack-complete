import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MatCardModule } from '@angular/material/card';
import {MeComponent} from "./components/me/me.component";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatDividerModule} from "@angular/material/divider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {HeaderComponent} from "./components/header/header.component";
import {HomeComponent} from "./components/home/home.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import {LoginComponent} from "./features/auth/components/login/login.component";
import {RegisterComponent} from "./features/auth/components/register/register.component";
import { PostDetailComponent} from "./features/posts/components/detail/detail.component";
import { PostFormComponent} from "./features/posts/components/form/form.component";
import { PostListComponent} from "./features/posts/components/list/list.component";
import {TopicListComponent} from "./features/topics/components/list/list.component";

const materialModule = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatSnackBarModule,
  MatToolbarModule,
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    PostDetailComponent,
    PostFormComponent,
    PostListComponent,
    TopicListComponent,
    HomeComponent,
    MeComponent,
    NotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...materialModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSidenavModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
