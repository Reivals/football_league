import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ClubEditComponent} from './components/club/club-edit/club-edit.component';
import {ClubComponent} from './components/club/club.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import {FootballerComponent} from './components/footballer/footballer.component';
import {FootballerEditComponent} from './components/footballer/footballer-edit/footballer-edit.component';
import {MatchEditComponent} from './components/match/match-edit/match-edit.component';
import {MatchOverviewComponent} from './components/match/match-overview/match-overview.component';
import {MatchComponent} from './components/match/match.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ClubSquadComponent} from './components/club/club-squad/club-squad.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {TeamComponent} from './components/match/team/team.component';
import {TeamPickerComponent} from './components/match/team-picker/team-picker.component';
import {GoalsComponent} from './components/match/goals/goals.component';
import {HomePanelComponent} from './components/home-panel/home-panel.component';
import { ContactComponent } from './components/contact/contact.component';
import { CardsComponent } from './components/match/cards/cards.component';

const routes: Routes = [
  {
    path: 'contact', component: ContactComponent, children: [
    ]
  },
  {
    path: 'clubs', component: ClubComponent, children: [
      {path: 'edit/:id', component: ClubEditComponent},
      {path: 'add', component: ClubEditComponent},
      {path: 'squad/:id', component: ClubSquadComponent}
    ]
  },
  {
    path: 'footballers', component: FootballerComponent, children: [
      {path: 'edit/:id', component: FootballerEditComponent},
      {path: 'add', component: FootballerEditComponent}
    ]
  },
  {
    path: 'matches', component: MatchComponent, children: [
      {path: 'add', component: MatchEditComponent},
      {path: ':id/edit', component: MatchEditComponent},
      {path: ':id', component: MatchOverviewComponent}
    ]
  },
  {path: '', component: ClubComponent, pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePanelComponent,
    ClubComponent,
    ClubEditComponent,
    PageNotFoundComponent,
    ClubSquadComponent,
    MatchComponent,
    TeamComponent,
    MatchEditComponent,
    GoalsComponent,
    TeamPickerComponent,
    FootballerEditComponent,
    FootballerComponent,
    MatchOverviewComponent,
    ContactComponent,
    CardsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
