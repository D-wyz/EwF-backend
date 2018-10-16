var Team = require('../models/Team');
var game = require('../utils/game');
const jwt = require('jsonwebtoken');


module.exports = {

    findTeams: (req, res, next) => {

        Team.find({})
            .then(teams => {
                let success = {}
                success.confirmation = true;
                success.payload = teams;

                res.json(success);
            })
            .catch(err => {
                res.json(err);
            })

    },
    findTeam: (params) => {
        
        return new Promise((resolve, reject) => {
            Team.findById(params.id)
                .then(teams => {
                    resolve(teams);
                })
                .catch(err => {
                    reject(err);
                })
        });
    },

    create: (params) => {

        return new Promise((resolve, reject) => {
            Team.create(params)
                .then(team => {

                    const payload = {
                        teamName: team.teamName,
                        id: team._id
                    }

                    jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 3600
                    }, (err, token) => {

                        if (err) {
                            reject(err);
                        } else {
                            let success = {};
                            success.confirmation = true;
                            success.token = `Bearer ${token}`;
                            resolve(success);
                        }
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    },
    resetChallenges: () => {

        return new Promise((resolve, reject) => {

            Team.find({})
                .then(teams => {
                        let ids = teams.map(e => e._id);
                        ids.forEach((e) => {

                        Team.findById(e)
                            .then(foundTeam => {

                                let currentTeam = {}
                                currentTeam.challenge1 = game.generateChallenge();
                                currentTeam.challenge2 = game.generateChallenge();
                                currentTeam.challenge3 = game.generateChallenge();
                                currentTeam.challenge = [false, false, false]

                                Team.findOneAndUpdate(foundTeam._id, currentTeam)
                                    .then(team => {
                                        resolve(team)
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        reject(id)
                                    })
                            })
                            .catch(err => {
                                reject(err);
                            })
                        })
                });
        })
    },
    updateTeam: (body) => {

        return new Promise((resolve, reject) => {
            Team.findById(body.id)
                .then(foundTeam => {
                
                    let currentTeam = body
                    Team.findOneAndUpdate(body.id, currentTeam)
                        .then(team => {
                            resolve(team)
                        })
                        .catch(err => {
                            console.log(err)
                            reject(id)
                        })

                })
                .catch(err => {
                    reject(err);
                })

        })
    },
    addUser: (params) => {

        return new Promise((resolve, reject) => {
            Team.findById(params.id)
                .then(foundTeam => {

                    let currentTeam = {}
                    currentUsers = foundTeam.users
                    currentUsers.push(params.user)
                    currentTeam.users = currentUsers

                    Team.findOneAndUpdate(params.id, currentTeam)
                        .then(team => {
                            resolve(team)
                        })
                        .catch(err => {
                            console.log(err)
                            reject(id)
                        })

                })
                .catch(err => {
                    reject(err);
                })

        })
    },
    removeUser: (params) => {

        return new Promise((resolve, reject) => {
            Team.findById(params.id)
                .then(foundTeam => {

                    let currentTeam = {}
                    currentUsers = foundTeam.users 
                    let indx = currentUsers.indexOf(params.user)
                    currentUsers.splice(indx)
                    currentTeam.users = currentUsers

                    Team.findOneAndUpdate(params.id, currentTeam)
                        .then(team => {
                            resolve(team)
                        })
                        .catch(err => {
                            console.log(err)
                            reject(id)
                        })

                })
                .catch(err => {
                    reject(err);
                })

        })
    }
}