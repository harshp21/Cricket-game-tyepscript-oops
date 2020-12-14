import { Player } from './players';

export class Team {
    private id: number;
    private players: Array<Player> = [];
    private totalTeamScore: number = 0;
    private teamName: string = '';
    private domElement: HTMLElement;

    constructor(players: Array<Player>, teamName: string, id: number) {
        this.players = players;
        this.teamName = teamName;
        this.id = id;
        this.domElement = this.createDom();
    }

    private createDom(): HTMLElement {
        let scoreboard = document.createElement("table");
        scoreboard.border = '2px';
        scoreboard.style.padding = '5px';
        scoreboard.id = `${this.teamName}-scoreboard`;
        let scoreboardContent = document.createElement("tbody");

        let scoreboardHeader = [`${this.teamName}`, 'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'TOTAL'];

        let scoreboardHeaderRow = document.createElement('tr');
        scoreboardHeader.forEach((header) => {
            let scoreboardHeaderData = document.createElement('td');
            scoreboardHeaderData.innerHTML = header;
            scoreboardHeaderRow.appendChild(scoreboardHeaderData);
        })

        scoreboardContent.appendChild(scoreboardHeaderRow);

        this.players.forEach((player) => {
            scoreboardContent.appendChild(player.getDomElement());
        })
        scoreboard.append(scoreboardContent);
        return scoreboard;
    }

    public getDomElement(): HTMLElement {
        return this.domElement;
    }

    public calculateTotalTeamScore(): number {
        this.totalTeamScore = this.players.reduce((acc, player) => {
            return acc + player.calculateTotalScore();
        }, 0);
        return this.totalTeamScore;
    }

    public getTeamName(): string {
        return this.teamName;
    }

    public getPlayers(): Array<Player> {
        return this.players;
    }

    public getTotalTeamScore(): number {
        this.calculateTotalTeamScore();
        return this.totalTeamScore;
    }

    public getTeamId(): number {
        return this.id;
    }

    public declareInnings(): void {
        let idOfTeamBatting = `${this.teamName}-bat`;
        let hitBtn = (<HTMLInputElement>document.getElementById(idOfTeamBatting));
        hitBtn.disabled = true;
    }
}
