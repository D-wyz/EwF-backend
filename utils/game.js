module.exports = {
  generateChallenge() {
    var POI = [
      { name: 'Times Square', postion: [40.758896, -73.985130] },
      { name: 'Statue of Liberty', postion: [40.689247, -74.044502] },
      { name: 'Empire State Building', postion: [40.748817, -73.985428] },
      { name: 'Museum of Modern Art', postion: [40.7614, -73.9776] },
      { name: 'American Museum of Natural History', postion: [40.7813, -73.9740] },
      { name: 'Lincoln Center for the Performing Arts', postion: [40.7725, -73.9835] },
      { name: 'Central Park', postion: [40.785091, -73.968285] },
      { name: 'One World Trade Center', postion: [40.7127, -74.0134] },
      { name: 'Brooklyn Bridge', postion: [40.7061, -73.9969] },
      { name: 'High Line', postion: [40.7480, -74.0048] }
    ]
    let challengesArray = [];

    for (let i = 0; i < 3; i++) {

      let index = Math.floor(Math.random() * POI.length);
      let challenge = POI[index]
      challengesArray.push(challenge);
      POI.splice(index, index + 1);
    }
    // game logic for generating challenges goes here
    return challengesArray;
  },
  scoreUser(user) {
    console.log(user);

  },
  teamUser(team) {
    console.log(team);

  }
}
