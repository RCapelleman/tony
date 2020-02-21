var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var utils = require("utils");

var roles = ["harvester", "upgrader", "builder", "repairer"];

// MOVE = 50
// WORK = 100
// CARRY = 50
// ATTACK = 80
// HEAL = 250
// TOUGHT = 10
// CLAIM = 600

var optionsHarvester = [
        [WORK,WORK,CARRY,MOVE],
        [WORK,WORK,WORK,CARRY,MOVE],
        [WORK,WORK,WORK,CARRY,CARRY,MOVE],
        [WORK,WORK,WORK,CARRY,CARRY,MOVE],
        [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE],
        [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE]
    ];
var optionsOthers = [
    [WORK,WORK,CARRY,MOVE],
    [WORK,WORK,WORK,CARRY,MOVE],
    [WORK,WORK,WORK,CARRY,CARRY,MOVE],
    [WORK,WORK,WORK,CARRY,CARRY,MOVE],
    [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
    [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE]
];
var MAX_BUILDER = 3;
var MAX_REPAIRER = 1;
var MAX_HARVESTER = 4;


module.exports.loop = function(){
    for(let name in Memory.creeps){
        if(Game.creeps[name] == undefined){
            console.log("Est mort ce soir:", Memory.creeps[name]);
            delete Memory.creeps[name];
        }
    }
    for(let name in Game.creeps) {
        var creep = Game.creeps[name];
        switch (creep.memory.role) {
          case 'harvester':
            roleHarvester.run(creep);
            break;
          case 'upgrader':
            roleUpgrader.run(creep);
            break;
          case 'builder':
            roleBuilder.run(creep);
            break;
          case 'repairer':
            roleRepairer.run(creep);
            break;
          default:
            console.log("Role not present :", crrep.memory.role);
        }
        //utils.log(creep)
    }
    var numeroDeHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    var numeroDeBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    var numeroDeRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numeroDeUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    console.log("Nb de harvesters: ", numeroDeHarvesters);
    
    var roleB = numeroDeBuilder < MAX_BUILDER? 'builder': numeroDeRepairer < MAX_REPAIRER ? 'repairer':'upgrader';
    var roleA = numeroDeHarvesters == MAX_HARVESTER? roleB:'harvester';
    var extensions = creep.room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
    var options = numeroDeHarvesters == MAX_HARVESTER? optionsOthers:optionsHarvester;
    console.log("role=", roleA);
    console.log("name=", creep.name);
    console.log("options=", options[extensions!=null?extensions.length:0]);
    Game.spawns.Spawn1.createCreep(options[extensions!=null?extensions.length:0],undefined,{role:roleA,working:false});
}