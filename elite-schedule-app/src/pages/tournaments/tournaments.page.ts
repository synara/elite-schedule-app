import {Component} from '@angular/core';

import {MyTeams, TeamPage} from '../pages';
import { NavController, LoadingController } from "ionic-angular";
import { EliteApi } from "../../app/shared/shared";

@Component({
    templateUrl: "tournaments.page.html"
})

export class TournamentPage {

    tournaments: any;

    constructor(private _nav: NavController,
                private _eliteApi: EliteApi, 
                private _loading: LoadingController) {}

    itemTappped($event, tourney) {
        this._nav.push(TeamPage, tourney);
    }

    ionViewDidLoad(){
        let loader = this._loading.create({
            content: 'Getting tournaments...'
            //spinner: 'dots',
        });

        loader.present().then(() => {
            this._eliteApi.getTournaments().then(data => {
                this.tournaments = data;
                loader.dismiss();
            });
        });
    }
}
