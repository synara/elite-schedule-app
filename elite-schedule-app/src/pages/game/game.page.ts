import {Component} from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { EliteApi } from "../../app/shared/shared";
import { TeamHome } from "../pages";

@Component({
    templateUrl: "game.page.html"
})

export class GamePage {
    
    game: any;

    constructor(
        private _nav: NavController, 
        private _navParams: NavParams,
        private _elite: EliteApi) {}

    ionViewDidLoad() {
        this.game = this._navParams.data;
    }

    teamTapped(teamId) {
        let tourneyData = this._elite.getCurrentTourney();
        let team = tourneyData.teams.find(t => t.id == teamId);
        this._nav.push(TeamHome, team);
    }

    goToDirections() {
        
    }

    goToMap() {

    }

    isWinner(score1, score2) {
        return Number(score1) > Number(score2);
    }
}

