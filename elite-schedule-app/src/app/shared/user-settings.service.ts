
import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { Events } from "ionic-angular";

@Injectable()
export class UserSettings {

    storage: Storage;
    constructor(private _events: Events) {}

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
        this.storage.set(team.id, JSON.stringify(item));
        this._events.publish('favorites:changed');
    }

    unfavoriteTeam(team) {
        this.storage.remove(team);
        this._events.publish('favorites:changed');

    }

    isFavoriteTeam(teamId){
        return this.storage.get(teamId).then(value => value ? true : false);
    }

    getAllFavorites() {
        let items = [];
        _.forIn(window.localStorage, (v, k) => {
            items.push(JSON.stringify(v));
        });

        return items.length ? items : null;
    }

}