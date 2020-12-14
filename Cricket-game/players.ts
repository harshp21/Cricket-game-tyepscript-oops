import { Team } from './team';

interface ScorePerBall {
    ballNo: number,
    runScored: number,
}


export class Player {
    private totalScore: number = 0;
    private name: string;
    private runs: Array<ScorePerBall> = [];
    private domElement: HTMLElement;
    private id: number;
    private noOfBallsToFace: number = 6;
    private teamId: number;

    constructor(name: string, id: number, teamId: number) {
        this.name = name;
        this.id = id;
        this.teamId = teamId;
        this.domElement = this.createDomElement();

    }

    private createDomElement(): HTMLElement {
        let scoreboardPlayerRow = document.createElement('tr');
        let scoreBoardPlayerData = document.createElement('td');
        scoreBoardPlayerData.innerHTML = this.name;
        scoreboardPlayerRow.appendChild(scoreBoardPlayerData);

        for (let ball = 1; ball <= this.noOfBallsToFace; ball++) {
            let scoreBoardPlayerData = document.createElement('td');
            scoreBoardPlayerData.id = `T${this.teamId}B${ball}P${this.id}`;
            scoreboardPlayerRow.appendChild(scoreBoardPlayerData);
        }

        let scoreboardPlayerTotal = document.createElement('td');
        scoreboardPlayerTotal.id = `T${this.teamId}P${this.id}-total`;
        scoreboardPlayerRow.appendChild(scoreboardPlayerTotal);
        return scoreboardPlayerRow;
    }

    public getDomElement(): HTMLElement {
        return this.domElement;
    }

    public getTotalScore(): number {
        return this.totalScore;
    }

    public calculateTotalScore(): number {
        this.totalScore = this.runs.reduce((acc, item) => acc + item.runScored, 0);
        return this.totalScore;
    }

    public setRuns(runsScored: ScorePerBall): void {
        this.runs.push(runsScored);
    }

    public getPlayerName(): string {
        return this.name;
    }

    public hitRun(team: Team, ballNo: number, runs: number): void {
        let runScored = {
            ballNo: ballNo,
            runScored: runs,
        }
        this.setRuns(runScored);
        (<HTMLInputElement>document.getElementById(`T${this.teamId}B${ballNo}P${this.id}`)).innerHTML = `${runs}`;
        (<HTMLInputElement>document.getElementById(`T${this.teamId}-score`)).innerHTML = `${team.calculateTotalTeamScore()}`;
    }

}
