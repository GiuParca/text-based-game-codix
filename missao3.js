var utils = require("./utils.js");
var getIP = utils.getIP;
var variables = require("./variables.js");
var player = variables.player;
var missions = variables.missions;
var agent = require("./agent.js");
var agentMightAppear = agent.agentMightAppear;

function getMission3(engine) {
    // ###### Codix Stage - gain experience and intel ######
    var mission3 = engine.create({
        name: 'Codix -> Mission3',
        type: 'stage'
    });

    mission3.executeBefore(function () {
        player.currentMission = 3;
        if (variables.hasBattleStart) {
            console.log("The final battle is underway, you cannot access this stage.")
            return false;
        }
        if (player.stamina < 10) {
            console.log("Before going any further, you need to rest.");
            return false;
        }
        if (player.missionsCompleted < 2) {
            console.log("You need to complete Mission 2 to do Mission 3.")
            return false
        }
        if (player.missionsCompleted > 2) {
            console.log("You have already completed this mission.")
            return false
        }
        engine.showBanner('Mission 3');
        console.log("Welcome to your third mission.");
        console.log("Your mission is to obtain the main IP used by Codix computer");
        console.log("By starting this mission you use up 10 stamina points. Good luck!\n");
        player.stamina -= 10;
    });

    mission3.addQuestion({
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

    mission3.addQuestion({
        type: 'confirm',
        message: "This mission is highly risky, are you sure you want to get this information?\n",
        action: function (answer) {
            if (answer) {
                var IP = getIP();
                console.log("\nWell done, you've discovered the IP address: " + IP + "\n");
                player.missionsCompleted = player.currentMission;
                return false;

            } else {
                console.log("\nReturn to the Nebuchadnezzar and come back when you feel ready. ");
            }
        }
    })

    mission3.executeAfter(function () {
        if (player.missionsCompleted == player.currentMission) {
            player.experience += missions[2].experience;
            player.intel.push(missions[2].intelReward);
            player.skillPoints++;
            console.log("You've finished the third mission.\n");
            console.log("----Player Summary----");
            console.log(`Experience: ${player.experience}`);
            console.log(`Skill Points: ${player.skillPoints}`);
            console.log(`Stamina: ${player.stamina}\n`);
        }
    })

};

module.exports = {
    getMission3
}
