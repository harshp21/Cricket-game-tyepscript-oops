import { Player } from './players';

export class Team {
    private players: Array<Player> = [];
    private totalTeamScore: number = 0;
    private teamName: string = '';

    constructor(players: Array<Player>, teamName: string) {
        this.players = players;
        this.teamName = teamName;
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
        return this.totalTeamScore;
    }

}