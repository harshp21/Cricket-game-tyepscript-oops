import { Team } from './team';

interface ScorePerBall {
    ballNo: number,
    runScored: number,
}


export class Player {
    private totalScore: number = 0;
    private name: string;
    private runs: Array<ScorePerBall> = [];

    constructor(name: string) {
        this.name = name;
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

}