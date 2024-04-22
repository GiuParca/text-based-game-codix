var engine = require("workshop-engine");
var variables = require("./variables.js");
var player = variables.player;

function agentMightAppear(mission) {
    var diceResult = Math.floor(1 + 6 * Math.random());
    if (diceResult > mission) {
        return false
    } else {
        if (player.experience >= 30 && player.stamina > 10) {
            console.log("\n****************************************************************************")
            console.log("The agent showed up but you managed to use your Dodge Bullets Skill to escape.")
            console.log("****************************************************************************\n")
            player.stamina -= 10
            return false
        }
        if (player.health > 10) {
            console.log("\n**************************************************")
            console.log("You failed to fulfil your mission. The agent appeared and you fought. You managed to escape the fight, but you're injured.")
            console.log("**************************************************\n")
            player.health -= 10
            return true
        } else {
            console.log("\n++++++++++++++++++++++++++++++++++++++++++++++++++")
            console.log("You were killed in the fight against the agent")
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++\n")
            engine.quit()
        }
    }
}

module.exports = {
    agentMightAppear
}