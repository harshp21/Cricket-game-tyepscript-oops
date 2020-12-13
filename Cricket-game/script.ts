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

let teamOnePlayers = nameOfTeamOnePLayers.map((playerName) => {
    return new Player(playerName)
})

let teamTwoPlayers = nameOfTeamTwoPLayers.map((playerName) => {
    return new Player(playerName)
})
let teamOneName = 'MI';
let teamTwoName = 'CSK';
let teamOne = new Team(teamOnePlayers, teamOneName);
let teamTwo = new Team(teamTwoPlayers, teamTwoName);

let game = new Cricketgame(teamOne, teamTwo);

game.start();

