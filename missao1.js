var os = require('os');
var variables = require("./variables.js");
var player = variables.player;
var missions = variables.missions;
var agent = require("./agent.js");
var agentMightAppear = agent.agentMightAppear;

function getMission1(engine) {

    // ###### Codix Stage - gain experience and intel ######
    var mission1 = engine.create({
        name: 'Codix -> Mission1',
        type: 'stage'
    });

    mission1.executeBefore(function () {
        player.currentMission = 1;
        if (variables.hasBattleStart) {
            console.log("The final battle is underway, you cannot access this stage.")
            return false;
        }
        if (player.stamina < 10) {
            console.log("Before going any further, you need to rest.");
            return false;
        }
        if (player.missionsCompleted > 1) {
            console.log("You have already completed this mission.")
            return false
        }
        engine.showBanner('Mission 1');
        console.log("Welcome to your first mission.");
        console.log("Your objective is to obtain the Operating System used by the computer running Codix.");
        console.log("By starting this mission you use up 10 stamina points. Good luck!\n");
        player.stamina -= 10;
    });

    mission1.addQuestion({
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

    mission1.addQuestion({
        type: 'input',
        message: 'You were able to access the Codix terminal, type the Node command to complete this task:\n',
        validator: function (answer) {
            try {
                comandResult = eval(answer);
            } catch {
                return "You entered an invalid command, try again.";
            }
        },
        action: function (answer) {
            if (comandResult === os.platform()) {
                console.log("\nWell done, you've discovered the operating system: " + comandResult);
                player.missionsCompleted = player.currentMission;
                return false;
            } else {
                console.log("Try again later");
            }
        }

    })

    mission1.executeAfter(function () {
        if (player.missionsCompleted == player.currentMission) {
            player.experience += missions[0].experience;
            player.intel.push(missions[0].intelReward);
            player.skillPoints++;
            console.log("You've finished the first mission.\n");
            console.log("----Player Summary----");
            console.log(`Experience: ${player.experience}`);
            console.log(`Skill Points: ${player.skillPoints}`);
            console.log(`Stamina: ${player.stamina}\n`);
        }
    })



};

module.exports = {
    getMission1
}