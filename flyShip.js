var variables = require("./variables.js");
var player = variables.player;

function getFlyShipStage(engine) {
    var flyingShipStage = engine.create({
        name: 'Nebuchadnezzar',
        type: 'stage'
    });
    flyingShipStage.executeBefore(function () {
        if (variables.hasBattleStart) {
            console.log("The final battle is underway, you cannot access this stage.")
            return false;
        }
        engine.showBanner('Nebuchadnezzar');
    });
    flyingShipStage.addQuestion({
        type: 'list',
        message: 'Choose an action',
        options: ['Rest', 'Get a mission'],
        action: function (option) {
            if (option === 'Rest') {
                player.stamina = player.maxStamina;
                player.health = player.maxHealth;
                console.log("Well done! You recover your health and stamina to their max values.");
                console.log("Here is your currently status:");
                console.log(`Stamina: ${player.stamina}`);
                console.log(`Health: ${player.health}`);
            } else {
                console.log('Get ready, your mission starts here.');
            }
        }
    });

}

module.exports = {
    getFlyShipStage
}