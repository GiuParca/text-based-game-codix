var engine = require("workshop-engine");
var variables = require("./variables.js");
var player = variables.player;
var mission1 = require("./missao1.js");
var mission2 = require("./missao2.js");
var mission3 = require("./missao3.js");
var mission4 = require("./missao4.js");
var training = require("./training.js");
var oracle = require("./oracle.js");
var flyShip = require("./flyShip.js");
var battle = require("./battle.js");

// ###### Welcome Stage ######
var welcomeStage = engine.create({
    name: 'welcome stage',
    type: 'before'
});
welcomeStage.executeBefore(function () {
    engine.showBanner('Codix');
    console.log('Welcome to the Codix, young Coder.');
});
welcomeStage.addQuestion({
    type: 'input',
    message: 'Who are you?',
    validator: function (answer) {
        if (!answer.length) {
            return "Don't be shy, tell me your name!";
        }
    },
    action: function (answer) {
        player.name = answer;
    }
});
welcomeStage.addQuestion({
    type: 'list',
    message: `So, you're where because you feel that something is wrong.
    If you want to know more you must make a choice.
    Take the blue pill, the story ends and you continue with your life.
    You take the red pill you stay in Wonderland and I will show you how far the
    rabbit hole goes.`,
    options: ['Blue', 'Red'],
    action: function (choice) {
        if (choice === 'Blue') {
            console.log('Your story ends here.');
            engine.quit();
        } else {
            console.log('Your story starts here.');
        }
    }
});

// ###### Nebuchadnezzar Ship Stage ######
flyShip.getFlyShipStage(engine)

// ######  Codix Simulator ######
training.getTraining(engine)

// ###### Missions ######
mission1.getMission1(engine)
mission2.getMission2(engine)
mission3.getMission3(engine)
mission4.getMission4(engine)

//###### Oracle ######
oracle.getOracleStage(engine)

// ######  Battle Arena - Fight Agent Smith ######
battle.getFinalBattle(engine)

// ###### QUIT STAGE ######
var quitStage = engine.create({
    name: 'Quit',
    type: 'stage'
});
quitStage.addQuestion({
    type: 'confirm',
    message: 'Sure you want to quit?',
    action: function (option) {
        if (option) {
            console.log('Very well. Goodbye.');
            engine.quit();
        } else {
            console.log('Continue your adventure.');
        }
    }
});


engine.run();
