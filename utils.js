var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");

var optionsHarvester =  [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
var optionsOthers =     [WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE];
var MAX_BUILDER = 3;
var MAX_REPAIRER = 1;
var MAX_HARVESTER = 4;
var MAX_UPGRADER = 3;
var MAX_MINOR = 0;
var roles = [];

var energyVal = [["MOVE", 50],["WORK", 100],["CARRY", 50],["ATTACK", 80],["HEAL", 250],["TOUGHT",10], ["CLAIM", 600]];


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
                delete Memory.creeps[name];
            }
        }
    },
    giveRoles: function(){
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
              case 'minor':
                roleHarvester.mine(creep);
                  break;
              default:
                console.log("Role not present :", creep.memory.role);
            }
        }
    },
    calculateEnegyNecessary: function(array){
        var energyMap = new Map(energyVal);
        var sum = 0;
        array.forEach(e => {
            sum += energyMap.get(e.toUpperCase());
        });
        return sum;
    },
    createCreep : function(){
        var room = Game.rooms["W2N12"];
        var numeroDeHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
        var options = numeroDeHarvesters >= MAX_HARVESTER? optionsOthers:optionsHarvester;
        var energyNeeded = this.calculateEnegyNecessary(options);

        if(energyNeeded <= room.energyAvailable){
            var numeroDeBuilder  = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
            var numeroDeRepairer = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
            var numeroDeMinor    = _.sum(Game.creeps, (c) => c.memory.role == 'minor');
            var numeroDeUpgrader = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

            var role = 
                numeroDeHarvesters < MAX_HARVESTER  ? 'harvester':
                numeroDeBuilder    < MAX_BUILDER    ? 'builder': 
                numeroDeRepairer   < MAX_REPAIRER   ? 'repairer':
                numeroDeMinor      < MAX_MINOR      ? 'minor':
                numeroDeUpgrader   < MAX_UPGRADER   ? 'upgrader': 'none';
                
            if(role != 'none'){
                Game.spawns.Spawn1.createCreep(options,undefined,{role:role,working:false});
                console.log("Screep with role="+ role+" created. Energy consummed ="+ energyNeeded+", energy remaining =", room.energyAvailable);
            }
        }
    }
};