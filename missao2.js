var os = require('os');
var variables = require("./variables.js");
var player = variables.player;
var missions = variables.missions;
var agent = require("./agent.js");
var agentMightAppear = agent.agentMightAppear;


function getMission2(engine) {

    // ###### Codix Stage - gain experience and intel ######
    var mission2 = engine.create({
        name: 'Codix -> Mission2',
        type: 'stage'
    });

    mission2.executeBefore(function () {
        player.currentMission = 2;
        if (variables.hasBattleStart) {
            console.log("The final battle is underway, you cannot access this stage.")
            return false;
        }
        if (player.stamina < 10) {
            console.log("Before going any further, you need to rest.");
            return false;
        }
        if (player.missionsCompleted < 1) {
            console.log("You need to complete Mission 1 to do Mission 2.")
            return false
        }
        if (player.missionsCompleted > 1) {
            console.log("You have already completed this mission.")
            return false
        }
        engine.showBanner('Mission 2');
        console.log("Welcome to your second mission.");
        console.log("Your mission is to obtain the username with login permissions to Codix");
        console.log("By starting this mission you use up 10 stamina points. Good luck!\n");
        player.stamina -= 10;
    });


    mission2.addQuestion({
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

    mission2.addQuestion({
        type: 'list',
        message: 'You were able to access the Codix terminal, which of these commands you should execute:\n',
        options: ["os.hostname()", "os.userInfo().username", "os.username()"],
        action: function (answer) {
            if (answer !== "os.userInfo().username") {
                console.log("\nYou missed the command, the agents are after you. Go back to Nebuchadnezzar!\n");

            } else {
                console.log("\nWell done, you've discovered the username: " + eval(answer));
                player.missionsCompleted = player.currentMission;
                return false;

            }
        }
    })

    mission2.executeAfter(function () {
        if (player.missionsCompleted == player.currentMission) {
            player.experience += missions[1].experience;
            player.intel.push(missions[1].intelReward);
            player.skillPoints++;
            console.log("You've finished the second mission.\n");
            console.log("----Player Summary----");
            console.log(`Experience: ${player.experience}`);
            console.log(`Skill Points: ${player.skillPoints}`);
            console.log(`Stamina: ${player.stamina}\n`);
        }
    })
};


module.exports = {
    getMission2
}