var variables = require("./variables.js");
var player = variables.player;

function getTraining(engine) {

    // ######  Codix Simulator - improve your stats by spending skill points ######
    var training = engine.create({
        name: 'Training',
        type: 'stage'
    });

    training.executeBefore(function () {
        if (variables.hasBattleStart) {
            console.log("The final battle is underway, you cannot access this stage.")
            return false;
        }
        if (player.skillPoints <= 0) {
            console.log("You don't have enough skill points");
            return false;
        }
        engine.showBanner('Codix Simulator');
        console.log("Welcome to your training session ");
        console.log("Improve your stats by spending skill points. Good luck!\n");
    });

    training.addQuestion({
        type: 'list',
        message: "Before moving further in the game, it's important to train your skills and get ready for the final battle. Which stats do you want to improve?\n",
        options: ["Max Health", "Strength", "Max Stamina"],
        action: function (answer) {
            switch (answer) {
                case "Max Health":
                    player.maxHealth += 10;
                    console.log("\nCongratulations, you've received 10 Max Health points\n")
                    break
                case "Strength":
                    player.strength += 2;
                    console.log("\nCongratulations, you've received 2 Strength points\n")
                    break
                case "Max Stamina":
                    player.maxStamina += 10;
                    console.log("\nCongratulations, you've received 10 Max Stamina points\n")
                    break
            }

            player.skillPoints--;
            console.log("----Player Summary----");
            console.log(`Max Health: ${player.maxHealth}`);
            console.log(`Strength: ${player.strength}`);
            console.log(`Max Stamina: ${player.maxStamina}`);
            console.log(`Skill Points: ${player.skillPoints}`);
            return false
        }
    });
}

module.exports = {
    getTraining
}
