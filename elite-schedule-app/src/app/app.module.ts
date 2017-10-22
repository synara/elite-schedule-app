import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeams } from "../pages/pages";
import { GamePage } from "../pages/pages";
import { TeamDetailPage } from "../pages/pages";
import { TeamPage } from "../pages/pages";
import { TournamentPage } from "../pages/pages";
import { TeamHome } from "../pages/team-home/team-home.page";
import { Standings } from "../pages/standings/standings.page";
import { HttpModule } from '@angular/http';



@NgModule({
  declarations: [
    MyApp,
    MyTeams,
    GamePage,
    TeamDetailPage,
    TeamPage,
    TournamentPage,
    TeamHome,
    Standings,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeams,
    GamePage,
    TeamDetailPage,
    TeamPage,
    TournamentPage,
    TeamHome,
    Standings
    ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
