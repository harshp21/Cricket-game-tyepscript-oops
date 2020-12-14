import { Player } from './players';
import { Team } from './team';
import { Cricketgame } from './game';


let nameOfTeamOnePLayers = [
    'Rohit Sharma (C)',
    'Quinton de Kock',
    'Suryakumar Yadav',
    'Ishan Kishan',
    'Kieron Pollard',
    'Hardik Pandya',
    'Krunal Pandya',
    'James Pattinson',
    'Trent Boult',
    'Jaspreet Bumrah',
];

let nameOfTeamTwoPLayers = [
    'Shane Watson',
    'Faf du Plessis',
    'Ambati Rayudu',
    'MS Dhoni (C)',
    'Kedar Jadhav',
    'Dwayne Bravo',
    'Ravindra Jadeja',
    'Sam Curran',
    'Deepak Chahar',
    'Shardul Thakur',
];

let teamOneId = 1;
let teamTwoId = 2;
let teamOnePlayers = nameOfTeamOnePLayers.map((playerName, index) => {
    return new Player(playerName, index + 1, teamOneId)
})

let teamTwoPlayers = nameOfTeamTwoPLayers.map((playerName, index) => {
    return new Player(playerName, index + 1, teamTwoId)
})
let teamOneName = 'MI';
let teamTwoName = 'CSK';
let teamOne = new Team(teamOnePlayers, teamOneName, teamOneId);
let teamTwo = new Team(teamTwoPlayers, teamTwoName, teamTwoId);

let game = new Cricketgame(teamOne, teamTwo);

game.start();

