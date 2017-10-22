import {Component} from '@angular/core';
import { NavController, NavParams, LoadingController } from "ionic-angular";
import * as _ from 'lodash';
import {TeamHome} from '../pages';
import { EliteApi } from "../../app/shared/shared";


@Component({
    templateUrl: "teams.page.html"
})

export class TeamPage {
    private allTeams: any;
    private allTeamDivisions: any;
    queryText: string;

    constructor(private _nav: NavController, 
                private _navsParams: NavParams, 
                private _eliteApi: EliteApi,
                private loadingController: LoadingController) {}
    teams = [];
  

    ionViewDidLoad() {
        let selectedTourney = this._navsParams.data;

        let loader = this.loadingController.create({
            content: 'Getting data...'
        });

        loader.present().then(() => {
            this._eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
                this.allTeams = data.teams;
                this.allTeamDivisions = 
                    _.chain(data.teams)
                    .groupBy('division')
                    .toPairs()
                    .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
                    .value();   
                                
            this.teams = this.allTeamDivisions; 
            console.log('division teams: ', this.teams); 
            loader.dismiss();
            });
        });
      
    }

    itemTappped($event, team) {
        this._nav.push(TeamHome, team);
    }

    updateTeams() {
        let queryTextLower = this.queryText.toLowerCase();
        console.log(queryTextLower);
        let filteredTeams = [];
        _.forEach(this.allTeamDivisions, td => { 
            let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
            if(teams.length) {
                filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams })
            }
        });
        this.teams = filteredTeams;
    }
}

