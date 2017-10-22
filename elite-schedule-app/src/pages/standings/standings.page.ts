import {Component} from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { EliteApi } from "../../app/shared/shared";
import * as _ from 'lodash';

@Component({
    templateUrl: 'standings.page.html'
})

export class Standings {
    divisionFilter = 'division';
    standings: any[];
    team: any;
    allStandings: any[];
    

    constructor(private _nav: NavController,
                private _navParams: NavParams,
                private _elite: EliteApi) {}

    ionViewDidLoad() {
        this.team = this._navParams.data;
        let tourneyData = this._elite.getCurrentTourney();
        this.standings = tourneyData.standings;

        /*this.allStandings = 
            _.chain(this.standings)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
            .value();
        */
            console.log('standings: ', this.standings);
           // console.log('division standings: ', this.allStandings);

           this.allStandings = tourneyData.standings;
           this.filterDivision();
    }

    getHeader(record, recordIndex, records) {
        if(recordIndex === 0 || record.division !== records[recordIndex-1].division) {
            return record.division;
        }
        return null;
    }

    filterDivision() {
        if(this.divisionFilter == 'all'){
            this.standings = this.allStandings;
        } else {
            this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
        }
    }
}