import {Component} from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from "ionic-angular";
import { MyTeams } from "../pages";
import { EliteApi, UserSettings } from "../../app/shared/shared";
import * as _ from 'lodash';
import * as moment from 'moment';
import { GamePage }  from "../pages";

@Component({
    templateUrl: "teams-detail.page.html"
    //providers: [UserSettings]
})

export class TeamDetailPage {
    useDateFilter = false;
    allGames: any[];
    dateFilter: string;
    games: any[];
    team: any;
    teamStanding: any;
    isFollowing = false;

    private tourneyData: any;

    constructor(private _nav: NavController,
                private _navParams: NavParams,
                private _eliteApi: EliteApi,
                private _alert: AlertController,
                private _toast: ToastController,
                private _userSettings: UserSettings) {}
    
    ionViewDidLoad() {
         this.team = this._navParams.data;
         this.tourneyData = this._eliteApi.getCurrentTourney();

         this.games = _.chain(this.tourneyData.games)
                        .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                        .map(g => {
                            let isTeam1 = (g.team1Id === this.team.id);
                            let opponentName = isTeam1 ? g.team2 : g.team1;
                            let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                                 return {
                                    gameId: g.id,
                                    opponent: opponentName,
                                    time: Date.parse(g.time),
                                    location: g.location,
                                    locationUrl: g.locationUrl,
                                    scoreDisplay: scoreDisplay,
                                    homeAway: (isTeam1 ? "vs." : "at")
                                };
                         })
                        .value();
                        
        this.allGames = this.games;
        this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id });
        this._userSettings.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
    }

    getScoreDisplay(isTeam1, team1Score, team2Score) {
       if (team1Score && team2Score) {
           var teamScore = (isTeam1 ? team1Score : team2Score);
           var opponentScore = (isTeam1 ? team2Score : team1Score);
           var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
           return winIndicator + teamScore + "-" + opponentScore;
        }
        else {
            return "";
        }
    }

    gameClicked($event, game) {
        let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
        this._nav.parent.parent.push(GamePage, sourceGame);
    }

    dateChanged() {
        if(this.useDateFilter){
            this.games = _.filter(this.games, g => moment(g.time).isSame(this.dateFilter, 'day'));
        } else {
            this.games = this.allGames;
        }
    }

    getScoreWorL(game) {
        return game.scoreDisplay ? game.scoreDisplay[0] : '';
    }

    getScoreDisplayBadgeClass(game) {
        return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
    }

    toggleFollow() {
        if(this.isFollowing) {
            let confirm = this._alert.create({
                title: 'Unfollow?',
                message: 'Are you sure you want to unfollow?',
                buttons:[
                    {
                        text:'Yes', 
                        handler: () => {
                            this.isFollowing = false;
                            this._userSettings.unfavoriteTeam(this.team);

                            let toast = this._toast.create ({
                                message: 'You have unfollowed this team.',
                                duration: 2000,
                                position: 'bottom'
                            });
                            toast.present();
                        }
                    },
                    {
                        text: 'No'
                    }
                ]
            });
            confirm.present();
        } else {
            this.isFollowing = true;
            this._userSettings.favoriteTeam(this.team, this.tourneyData.tournament.id, this.tourneyData.tournament.name);
        }

    }

    refreshAll(refresher) {
        this._eliteApi.refreshCurrentTourney().subscribe(() =>  {
            refresher.complete();
            this.ionViewDidLoad();
        });
    }

   /*goHome() {
        this._nav.push(MyTeams);
        this._nav.popToRoot();
        this._nav.parent.parent.popToRoot();
    }*/
}

