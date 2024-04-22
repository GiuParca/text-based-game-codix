var os = require('os');
var utils = require("./utils.js");
var getIP = utils.getIP;
var variables = require("./variables.js");
var player = variables.player;
var missions = variables.missions;
var agent = require("./agent.js");
var agentMightAppear = agent.agentMightAppear;

function getMission4(engine) {

    // ###### Codix Stage - gain experience and intel ######
    var mission4 = engine.create({
        name: 'Codix -> Mission4',
        type: 'stage'
    });

    mission4.executeBefore(function () {
        player.currentMission = 4;
        if (variables.hasBattleStart) {
            console.log("The final battle is underway, you cannot access this stage.")
            return false;
        }
        if (player.stamina < 10) {
            console.log("Before going any further, you need to rest.");
            return false;
        }
        if (player.missionsCompleted < 3) {
            console.log("You need to complete Mission 3 to do Mission 4.")
            return false
        }
        if (player.missionsCompleted > 3) {
            console.log("You have already completed this mission.")
            return false
        }
        engine.showBanner('Mission 4');
        console.log("Welcome to your fourth and final mission.");
        console.log("You need to convince the greatest hacker of all time to help you on this mission, good luck!");
        console.log("By starting this mission you use up 10 stamina points.\n");
        player.stamina -= 10;
    });

    mission4.addQuestion({
        type: 'confirm',
        message: "Are you sure you want to start the mission?\n",
        action: function (answer) {
            if (answer == false) {
                console.log("\nCome back when ready. ");
                return false
            } else {
                var agentGotYou = agentMightAppear(player.currentMission);
                if (agentGotYou) {
                    return false;
                }
            }
        }
    })

    mission4.addQuestion({
        type: 'input',
        message: "You've managed to find Eliot, share with him the information about the Operating System, username and IP of the Codix computer. (Separate them with ' ; ' - example : win32;username;0.0.0.0)!\n ",
        validator: function (answer) {
            if (answer.split(";").length != 3) {
                return "Invalid data, share the data according to the example"
            }
        },
        action: function (answer) {
            var operatingSystem = answer.split(";")[0];
            var username = answer.split(";")[1];
            var ip = answer.split(";")[2];
            var isOsCorrect = operatingSystem == os.platform();
            var isUsernameCorrect = username == os.userInfo().username;
            var isIPCorrect = ip == getIP();
            if (isOsCorrect && isUsernameCorrect && isIPCorrect) {
                console.log("You've managed to hack Codix and Eliot is part of your team, get back to Nebuchadnezzar together.");
                player.missionsCompleted = player.currentMission;
                return false;
            } else {
                console.log("\nYou shared the wrong information, Eliot is starting to suspect you... try again!")
            }

        }
    })

    mission4.executeAfter(function () {
        if (player.missionsCompleted == player.currentMission) {
            player.experience += missions[3].experience;
            player.intel.push(missions[3].intelReward);
            player.skillPoints++;
            console.log("You've finished the fourth mission.\n");
            console.log("----Player Summary----");
            console.log(`Experience: ${player.experience}`);
            console.log(`Skill Points: ${player.skillPoints}`);
            console.log(`Stamina: ${player.stamina}\n`);
        }
    })

};


module.exports = {
    getMission4
}
