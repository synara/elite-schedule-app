import {Component} from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { Standings, TeamDetailPage, MyTeams } from '../pages';

@Component({
    templateUrl: 'team-home.page.html'
})

export class TeamHome {

    team: any;
    teamDetailTab = TeamDetailPage;
    standingsTab = Standings;

    constructor(private _nav: NavController, private _navParams: NavParams){
        this.team = this._navParams.data;
    }

    goHome() {
        //this._nav.push(MyTeams);
        this._nav.popToRoot();
    }
}