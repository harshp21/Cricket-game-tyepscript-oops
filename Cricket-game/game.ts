import { Team } from './team';
import { Player } from './players';

export class Cricketgame {
    private winnerTeam: Team;
    private manOfTheMatch: Player;
    private teamNoOne: Team;
    private teamNoTwo: Team;
    private timerCount: number = 60;
    private isInningsCompleted: boolean = false;
    private gameName: string = 'Cricket 2020';
    private currentBattingTeam: Team;
    private isTimerActive = false;

    constructor(teamNoOne: Team, teamNoTwo: Team) {
        this.teamNoOne = teamNoOne;
        this.teamNoTwo = teamNoTwo;
        this.winnerTeam = teamNoOne;
        this.manOfTheMatch = teamNoOne.getPlayers()[0];
        this.currentBattingTeam = this.teamNoOne;
        this.createGame();
    }

    public createGame(): void {
        let gameContainer = document.createElement('div');
        gameContainer.classList.add('container-fluid');

        let gameTitleContainer = this.gameTitleDOMCreation(this.gameName);

        let teamTotalContainer = this.teamTotalContainerDOMCreation();

        let generateBtnContainer = this.generateResultBtnDOMCreation();

        let scoreboardContainer = this.scoreBoardContainerDOMCreation();

        gameContainer.append(this.horizontalDividerDOMCreation(), gameTitleContainer, this.horizontalDividerDOMCreation(), teamTotalContainer, this.horizontalDividerDOMCreation(), generateBtnContainer, scoreboardContainer);
        document.body.append(gameContainer);

    }

    public start(): void {
        let idOfTeamOne = `${this.teamNoOne.getTeamName()}-bat`;
        this.battingForTeam(idOfTeamOne, this.teamNoOne);

        let idOfTeamTwo = `${this.teamNoTwo.getTeamName()}-bat`;
        this.battingForTeam(idOfTeamTwo, this.teamNoTwo);

        let generateResultBtn = (<HTMLInputElement>document.getElementById('generate-result'));
        let hitBtnForTeamOne = (<HTMLInputElement>document.getElementById(idOfTeamOne));
        let hitBtnForTeamTwo = (<HTMLInputElement>document.getElementById(idOfTeamTwo));
        hitBtnForTeamOne.disabled = false;
        hitBtnForTeamTwo.disabled = false;
        generateResultBtn.disabled = true;
    }

    private scoreRun(): number {
        let runsPossiblePerBall = [0, 1, 2, 3, 4, 6];
        return runsPossiblePerBall[Math.floor(Math.random() * runsPossiblePerBall.length)];
    }

    private battingForTeam(teamId: string, team: Team): void {
        let ball = 1;
        let playerNo = 1;
        let players = team.getPlayers();
        let hitBtn = (<HTMLInputElement>document.getElementById(teamId));
        hitBtn.addEventListener('click', () => {
            let runs = this.scoreRun();
            let isPlayerOut = (runs === 0);
            let isPlayerOutOfBallsToFace = (ball >= 6);
            let isLastPlayerBatting = (playerNo >= team.getPlayers().length);
            let isScoredBeenChasedDown = this.teamNoOne.getTotalTeamScore() < this.teamNoTwo.getTotalTeamScore();

            if (!(playerNo > team.getPlayers().length)) {
                players[playerNo - 1].hitRun(team, ball++, runs);
            }
            if (((isPlayerOutOfBallsToFace || isPlayerOut) && isLastPlayerBatting) || isScoredBeenChasedDown) {
                hitBtn.removeEventListener('click', () => { });
                team.declareInnings();
                hitBtn.disabled = true;
                this.isInningsCompleted = true;
            }
            if (isPlayerOutOfBallsToFace || isPlayerOut) {
                ball = 1;
                playerNo++;
            }
            if ((team === this.teamNoTwo) && (isScoredBeenChasedDown || ((isPlayerOutOfBallsToFace || isPlayerOut) && isLastPlayerBatting))) {
                let generateResultBtn = (<HTMLInputElement>document.getElementById('generate-result'));
                generateResultBtn.disabled = false;
            }
        })
    }

    private generateResult(): void {
        let teamNo = 1;
        this.calculateIndividualScoreAndUpdate(teamNo, this.teamNoOne);

        teamNo = 2;
        this.calculateIndividualScoreAndUpdate(teamNo, this.teamNoTwo);

        this.winnerTeam = (this.teamNoOne.getTotalTeamScore() > this.teamNoTwo.getTotalTeamScore()) ? this.teamNoOne : this.teamNoTwo;
        this.manOfTheMatch = this.winnerTeam.getPlayers().reduce((prevPlayer: Player, currentPlayer) => {
            return (prevPlayer.getTotalScore() > currentPlayer.getTotalScore()) ? prevPlayer : currentPlayer;
        });

        (<HTMLInputElement>document.getElementById('match-winner')).innerHTML = this.winnerTeam.getTeamName();
        (<HTMLInputElement>document.getElementById('man-of-the-match')).innerHTML = this.manOfTheMatch.getPlayerName();
        (<HTMLInputElement>document.getElementById('man-of-the-match-team')).innerHTML = `(${this.winnerTeam.getTeamName()})`;
        (<HTMLInputElement>document.getElementById('top-score')).innerHTML = `Score : ${this.manOfTheMatch.getTotalScore()}`;
    }

    private calculateIndividualScoreAndUpdate(teamNo: number, team: Team): void {
        team.getPlayers().forEach((player, playerNo) => {
            (<HTMLInputElement>document.getElementById(`T${teamNo}P${playerNo + 1}-total`)).innerHTML = `${player.calculateTotalScore()}`;
        })
    }

    private handleTimer(): void {
        if (!this.isTimerActive) {
            this.isTimerActive = true;
            let timer = setInterval(() => {
                this.timerCount--;
                (<HTMLInputElement>document.getElementById('timer')).innerHTML = `${this.timerCount}`;
                if (this.timerCount <= 0 || this.isInningsCompleted) {
                    this.currentBattingTeam.declareInnings();
                    clearInterval(timer);
                    this.resetTimer();
                    this.isInningsCompleted = false;
                }
            }, 1000);
        }
    }

    private resetTimer(): void {
        this.timerCount = 60;
        (<HTMLInputElement>document.getElementById('timer')).innerHTML = `${this.timerCount}`;
        this.isTimerActive = false;
    }

    private gameTitleDOMCreation(title: string): HTMLElement {
        let gameTitleRow = document.createElement('div');
        gameTitleRow.classList.add('row');

        let gameTitle = document.createElement('div');
        gameTitle.classList.add('col-lg-12', 'game-title');
        gameTitle.innerHTML = title;

        gameTitleRow.append(gameTitle);
        return gameTitleRow;
    }

    private teamTotalContainerDOMCreation(): HTMLElement {
        let gameTeamTotalContainer = document.createElement('div');
        gameTeamTotalContainer.classList.add('row');

        let teamOneTotalContainer = this.battingContainerDOMCreation(this.teamNoOne);

        let timerContainer = this.displayTimerDOMCreation();

        let teamTwoTotalContainer = this.battingContainerDOMCreation(this.teamNoTwo);

        gameTeamTotalContainer.append(teamOneTotalContainer, timerContainer, teamTwoTotalContainer);
        return gameTeamTotalContainer;
    }

    private generateResultBtnDOMCreation(): HTMLElement {
        let generateResultContainer = document.createElement('div');
        generateResultContainer.classList.add('row');

        let generateResultBtnContainer = document.createElement('div');
        generateResultBtnContainer.classList.add('col-lg-12');

        let generateResultBtn = document.createElement('button');
        generateResultBtn.id = 'generate-result';
        generateResultBtn.innerHTML = 'Generate Result';
        generateResultBtn.classList.add('btn', 'btn-primary');
        generateResultBtn.onclick = () => {
            this.generateResult();
        }

        generateResultBtnContainer.append(generateResultBtn);
        generateResultContainer.append(generateResultBtnContainer);
        return generateResultBtnContainer;
    }

    private scoreBoardContainerDOMCreation(): HTMLElement {
        let scoreboardContainer = document.createElement('div');
        scoreboardContainer.classList.add('row');
        let teamNo = 1;
        let teamOneScoreboardContainer = this.teamScoreboardDOMCreation(this.teamNoOne, teamNo);

        let resultContainer = this.resultDisplayDOMCreation();

        teamNo = 2;
        let teamTwoScoreboardContainer = this.teamScoreboardDOMCreation(this.teamNoTwo, teamNo);

        scoreboardContainer.append(teamOneScoreboardContainer, resultContainer, teamTwoScoreboardContainer);
        return scoreboardContainer;
    }


    private horizontalDividerDOMCreation(): HTMLElement {
        let hr = document.createElement('hr');
        return hr;
    }
    private battingContainerDOMCreation(team: Team): HTMLElement {
        let teamOneTotalContainer = document.createElement('div');
        teamOneTotalContainer.classList.add('col-lg-5');

        let teamScoreTitle = document.createElement('h3');
        teamScoreTitle.innerHTML = `${team.getTeamName()} Score`;

        let totalTeamScore = document.createElement('h3');
        totalTeamScore.id = `T${team.getTeamId()}-score`;
        totalTeamScore.innerHTML = '0';

        let hitBtn = document.createElement('button');
        hitBtn.id = `${team.getTeamName()}-bat`;
        hitBtn.innerHTML = 'HIT';
        hitBtn.onclick = () => {
            this.handleTimer();
        }
        hitBtn.classList.add('btn', 'btn-primary');

        teamOneTotalContainer.append(teamScoreTitle, totalTeamScore, hitBtn);
        return teamOneTotalContainer;
    }

    private displayTimerDOMCreation(): HTMLElement {
        let timerContainer = document.createElement('div');
        timerContainer.classList.add('col-lg-2', 'timer-container');

        let timerTitle = document.createElement('h3');
        timerTitle.innerHTML = 'TIMER';

        let timer = document.createElement('h1');
        timer.id = "timer";
        timer.innerHTML = `${this.timerCount}`;

        timerContainer.append(timerTitle, timer);

        return timerContainer;
    }

    private teamScoreboardDOMCreation(team: Team, teamNo: number): HTMLElement {
        let teamScoreboardContainer = document.createElement('div');
        teamScoreboardContainer.classList.add('col-lg-5', 'scoreboard-container');

        let scoreboardTitle = document.createElement('h5');
        scoreboardTitle.innerHTML = `${team.getTeamName()} Scoreboard`;

        teamScoreboardContainer.append(team.getDomElement());
        return teamScoreboardContainer;
    }

    private resultDisplayDOMCreation(): HTMLElement {
        let resultContainer = document.createElement('div');
        resultContainer.classList.add('col-lg-2', 'result-display');

        let winnerTeamTitle = document.createElement('h5');
        winnerTeamTitle.innerHTML = 'Match Won By';

        let winnerTeamDisplay = document.createElement('h5');
        winnerTeamDisplay.id = 'match-winner';

        let manOfTheMatchTitle = document.createElement('h5');
        manOfTheMatchTitle.innerHTML = 'Man Of the match';

        let manOfTheMatchDisplay = document.createElement('h5');
        manOfTheMatchDisplay.id = 'man-of-the-match';

        let manOfTheMatchTeam = document.createElement('h5');
        manOfTheMatchTeam.id = 'man-of-the-match-team';

        let manOfTheMatchScore = document.createElement('h5');
        manOfTheMatchScore.id = 'top-score';

        resultContainer.append(winnerTeamTitle, winnerTeamDisplay, this.horizontalDividerDOMCreation(), manOfTheMatchTitle, manOfTheMatchDisplay, manOfTheMatchTeam, manOfTheMatchScore);

        return resultContainer;
    }

}
