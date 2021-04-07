# Poker-tournament-backend

Poker-tournament version : 1.0.0

CURD operations for Poker-tournament statistic
Two tables players and Games

    Players table fields
    id
    name

    Games tabele fields
    id
    played: "date of game"
    player score: {
        player: "ref to tabele Players"
        score: "number of points in the game"
    }

Tournament rules :
The scoring model, for exemple if we have 6 players
firs - 6 points
secound - 5 points
third - 4 points
...
last - get 1 point
Players can have one rebuy and rebuy cost -1 point


Packages, dependencies and tools used:
Node
mongoDB
mongoose 
express 
budy parser
dotenv

This is version 1.0.0, Front-end is in development...   

### Installation

1. Clone the repo
```
git clone https://github.com/janix374/Poker-tournament-backend.git
```
2. Install NPM packages
```
npm install
```
3. Start project - Run script
```
npm run devStart
```