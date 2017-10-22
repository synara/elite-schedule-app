import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeams, TournamentPage } from "../pages/pages";
import { EliteApi, UserSettings } from './shared/shared';
import {  HttpModule } from '@angular/http';

@Component({
  templateUrl: 'app.html',
  providers: [ EliteApi, HttpModule, UserSettings ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  favoriteTeams: any[];
  rootPage: any = MyTeams;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              private _userSettings: UserSettings,
              private _loading: LoadingController,
              private _events: Events) {
    this.initializeApp();

    // used for an example of ngFor and navigation
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.refreshFavorites();

      this._events.subscribe('favorites:changed', () => this.refreshFavorites());
    });
  }

  refreshFavorites() {
    this.favoriteTeams = this._userSettings.getAllFavorites();
  }

  goToTeam(fav) {
    let loader = this._loading.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
  }
  goHome() {
    this.nav.push(MyTeams);
  }
   
  goToTournaments() {
    this.nav.push(TournamentPage);
  }
}
