import { AuthGuard } from './auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { UserlogService } from './userlog.service';
import { ToppersComponent } from './toppers/toppers.component';

const approutes:Routes=[
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: UserpanelComponent
  },
  {
    path: 'toppers',
    canActivate: [AuthGuard],
    component: ToppersComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserpanelComponent,
    ToppersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(approutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserlogService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
