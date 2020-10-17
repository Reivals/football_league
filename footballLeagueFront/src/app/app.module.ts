import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClubEditComponent} from './components/club/club-edit/club-edit.component';
import {ClubComponent} from './components/club/club.component';
import {RouterModule, Routes} from '@angular/router';
import {ClubSquadComponent} from './components/club/club-squad/club-squad.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
const routes: Routes = [
  {
    path: 'clubs', component: ClubComponent, children: [
      {path: 'edit/:id', component: ClubEditComponent},
      {path: 'add', component: ClubEditComponent},
      {path: 'squad/:id', component: ClubSquadComponent}
    ]
  },
  {path: '', component: ClubComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    ClubComponent,
    ClubEditComponent,
    ClubSquadComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
