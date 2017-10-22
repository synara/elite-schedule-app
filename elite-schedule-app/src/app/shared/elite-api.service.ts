import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
import { Observable } from "rxjs/Observable";

@Injectable()
export class EliteApi {
    
    baseUrl = 'https://elite-schedule-app-i2-2cdff.firebaseio.com';
    constructor(private _http: Http){}
    currentTourney: any = {};
    private tourneyData = {};

    getTournaments() {
        return new Promise(resolve => { 
            this._http.get(`${this.baseUrl}/tournaments.json`)
            .subscribe(res => resolve(res.json()));        
        });
    }

    getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any>{
        if(!forceRefresh && this.tourneyData[tourneyId]) {
            this.currentTourney = this.tourneyData[tourneyId];
            console.log('no need to make a http call, just return the data');
            return Observable.of(this.currentTourney);
        }

        console.log('about to make http call');
        return this._http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map(response => {
                this.tourneyData[tourneyId] = response.json();
                this.currentTourney = this.tourneyData[tourneyId];
                return this.currentTourney;
            });
    }

    getCurrentTourney() {
        return this.currentTourney;
    }

    refreshCurrentTourney() {
        return this.getTournamentData(this.currentTourney.tournament.id, true);
    }
}