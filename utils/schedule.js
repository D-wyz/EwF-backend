var schedule = require('node-schedule');
var game = require('./game')

var j = schedule.scheduleJob('*/1 * * * *', function () {
    console.log('Scheduling Test! ', game.generateChallenge());
});
