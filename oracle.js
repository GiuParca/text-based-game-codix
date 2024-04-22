var variables = require("./variables.js");
var player = variables.player;

function decodeIntel(intel) {
    return intel.split(".")
        .map(i => String.fromCharCode(97 + parseInt(i) - 1))
        .join("")
}

function getOracleStage(engine) {
    // ###### Oracle - get your premonition ######
    var oracleStage = engine.create({
        name: 'Oracle',
        type: 'stage'
    });
    oracleStage.executeBefore(function () {
        if (variables.hasBattleStart) {
            console.log("The final battle is underway, you cannot access this stage.")
            return false;
        }
        if (player.missionsCompleted < 4) {
            console.log("You need to succeed in all four missions to get the Oracle's premonition.");
            return false;
        }
        engine.showBanner('Oracle');
    });

    oracleStage.addQuestion({
        type: 'confirm',
        message: "Welcome to Oracle's home inside Codix. Do you want to receive the Oraculo's help?\n",
        action: function (answer) {
            if (answer) {
                var premonition = ""
                for (var i = 0; i < player.intel.length; i++) {
                    premonition += decodeIntel(player.intel[i]) + " "
                }
                console.log(premonition)
                player.oraclePremonition = true;
            } else {
                console.log("\nCome back when ready. ");
            }
        }
    })
}



module.exports = {
    getOracleStage
}