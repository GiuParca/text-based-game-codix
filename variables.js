// ###### Game Variables ######
var player = {
    name: null,
    health: 30,
    stamina: 30,
    strength: 1,
    maxHealth: 30,
    maxStamina: 30,
    chosenOne: false,
    experience: 0,
    skillPoints: 0,
    intel: [],
    currentMission: null,
    missionsCompleted: 0,
    oraclePremonition: false
};
var missions = [
    {
        number: 1,
        experience: 10,
        intelReward: '13.21.19.20'
    },
    {
        number: 2,
        experience: 20,
        intelReward: '06.09.07.08.20'
    },
    {
        number: 3,
        experience: 30,
        intelReward: '01.07.05.14.20'
    },
    {
        number: 4,
        experience: 40,
        intelReward: '19.13.09.20.08'
    }
];
var combatOptions = ['Attack', 'Counter', 'Recover'];
var agentSmith = {
    name: 'Smith',
    health: 150,
    counterImmune: false // whether it is immune to a Counter action
};

var hasBattleStart = false;

module.exports = {
    player, missions, combatOptions, agentSmith, hasBattleStart
}