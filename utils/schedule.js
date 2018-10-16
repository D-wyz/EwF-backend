var schedule = require('node-schedule');
var game = require('./game')
var Team = require('../controllers/teamController')

var j = schedule.scheduleJob('*/10 * * * *', function () {  // ss mm hh dd mm yyyy
    console.log('Scheduling Test!');
    Team.resetChallenges()
    
});
