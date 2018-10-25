module.exports = {
    generateChallenge() {
        // game logic for generating challenges goes here
        return { name: 'Test', postion: [2, 1] }
    },
    scoreUser(user) {
        console.log(user);
        
    },
    teamUser(team) {
        console.log(team);
        
    }
}


