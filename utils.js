var optionsHarvester = [
        [WORK,WORK,CARRY,MOVE],                     //300
        [WORK,WORK,CARRY,MOVE, MOVE],               //350
        [WORK,WORK,WORK,CARRY,CARRY,MOVE],          //450
        [WORK,WORK,WORK,CARRY,CARRY,MOVE],          //450
        [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE],     //550
        [WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE],      //550
        [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],
        [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
        [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
        [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
        [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE]// 800
    ];
var optionsOthers = [
    [WORK,WORK,CARRY,MOVE],
    [WORK,WORK,CARRY,MOVE, MOVE],
    [WORK,WORK,WORK,CARRY,CARRY,MOVE],
    [WORK,WORK,WORK,CARRY,CARRY,MOVE],
    [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE],
    [WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE],
    [WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
    [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
    [WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
    [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE],
    [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE]// 800
];
var MAX_BUILDER = 5;
var MAX_REPAIRER = 1;
var MAX_HARVESTER = 4;
var roles = ["harvester", "upgrader", "builder", "repairer"];

// MOVE = 50
// WORK = 100
// CARRY = 50
// ATTACK = 80
// HEAL = 250
// TOUGHT = 10
// CLAIM = 600

module.exports = {
    log : function(creep){
        console.log("name", creep.name);
        console.log("role", creep.memory.role);
        console.log("working", creep.memory.working);
        console.log("position", creep.pos);
    },
    cleanDeadCreep: function(){
        for(let name in Memory.creeps){
            if(Game.creeps[name] == undefined){
                console.log("Est mort ce soir:", Memory.creeps[name]);
                delete Memory.creeps[name];
            }
        }
    },
    createCreep : function(room){
        //creep.moveTo(new RoomPosition(25, 20, 'W10N5'));
        var numeroDeHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var numeroDeBuilder = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
        var numeroDeRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
        console.log("Harvester= "+numeroDeHarvesters+", builder= "+numeroDeBuilder+", repairer="+numeroDeRepairer);

        var roleB = numeroDeBuilder < MAX_BUILDER? 'builder': numeroDeRepairer < MAX_REPAIRER ? 'repairer':'upgrader';
        var roleA = numeroDeHarvesters == MAX_HARVESTER? roleB:'harvester';
        var extensions = room.find(FIND_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}});
        var options = numeroDeHarvesters == MAX_HARVESTER? optionsOthers:optionsHarvester;
        console.log("Screeps with role="+ roleA+" created.");
        Game.spawns.Spawn1.createCreep(options[extensions!=null?extensions.length:0],undefined,{role:roleA,working:false});
    }
};