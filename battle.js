var variables = require("./variables.js");
var player = variables.player;
var agentSmith = variables.agentSmith;

function getFinalBattle(engine) {
    // ######  Battle Arena - Fight Agent Smith ######
    var battle = engine.create({
        name: 'Battle Arena',
        type: 'stage'
    });

    battle.executeBefore(function () {
        variables.hasBattleStart = true;
        engine.showBanner('Battle Arena');
        console.log("################################################################################");
        console.log("You've found Agent Smith inside Codix. The final battle now begins. Good luck!");
        console.log("################################################################################\n");
    });

    battle.addQuestion({
        type: 'list',
        message: "You've just been attacked by Agent Smith.... what do you plan to do?\n",
        options: variables.combatOptions,
        action: function (answer) {
            switch (answer) {
                case "Attack":
                    player.health -= 20;
                    agentSmith.health -= player.strength * 3;
                    player.stamina -= 15;
                    console.log("\nWell played, you've just attacked Agent Smith.\n")
                    break
                case "Counter":
                    if (agentSmith.counterImmune == false) {
                        agentSmith.health -= (player.strength * 3) * 2;
                        player.stamina -= 15;
                        agentSmith.counterImmune = true;
                        console.log("\nNice counterattack, Agent Smith is twice hurt.\n");
                    } else {
                        player.health -= 20;
                        player.stamina -= 15;
                        agentSmith.counterImmune = false;
                        console.log("You failed to counterattack.");
                    }

                    break
                case "Recover":
                    player.health -= 20;
                    player.stamina == player.maxStamina;
                    console.log("\nYou took a break and recovered your stamina. Return to the fight. \n");
                    break
            }
            if (agentSmith.health <= 0) {
                console.log("\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/");
                console.log("CONGRATULATIONS, YOU WON THE GAME!!!!!!");
                console.log("\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\o/\n");
                engine.quit();
            }

            if (player.health <= 0 || player.stamina <= 0) {
                if (player.chosenOne == false) {
                    if (player.oraclePremonition) {
                        player.chosenOne = true;
                        player.maxHealth = player.maxHealth * 3;
                        player.maxStamina = player.maxStamina * 3;
                        player.strength = player.strength * 3;
                        player.health = player.maxHealth;
                        player.stamina = player.maxStamina;
                        console.log("The power within you has awakened, you are The Chosen One.\n");
                    } else {
                        console.log("You were defeated by Agent Smith.");
                        engine.quit();
                    }

                } else {
                    console.log("You really weren't the chosen one and you were defeated by Agent Smith. \n");
                    engine.quit();
                }
            }
            console.log("----End of round - Player Summary----");
            console.log(`Health: ${player.health}`);
            console.log(`Strength: ${player.strength}`);
            console.log(`Stamina: ${player.stamina}`);

        }
    });

}

module.exports = {
    getFinalBattle
}
