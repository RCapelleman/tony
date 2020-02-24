var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var rooms = require("rooms");

var optionsHarvester =  [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];
var optionsOthers =     [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];
var optionsWarriors =   [MOVE,MOVE,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,WORK,WORK];
var MAX_BUILDER = 1; 
var MAX_REPAIRER = 0; // Tower is there to repair for the moment
var MAX_HARVESTER = 3;
var MAX_UPGRADER = 2;
var MAX_HARVESTER_U = 2;
var MAX_WARRIOR = 0;

var energyVal = [["MOVE", 50],["WORK", 100],["CARRY", 50],["ATTACK", 80],["HEAL", 250],["TOUGH",10], ["CLAIM", 600]];


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
              case 'harvesterU':
                roleHarvester.harvestUpgrader(creep);
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
              case 'warrior':
                rooms.attackTop(creep);
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
        var numeroDeHarvesterU = _.sum(Game.creeps,  (c) => c.memory.role == 'harvesterU');
        var options = (numeroDeHarvesters >= MAX_HARVESTER || numeroDeHarvesterU < MAX_HARVESTER_U)? optionsOthers:optionsHarvester;
        var energyNeeded = this.calculateEnegyNecessary(options);

        if(energyNeeded <= room.energyAvailable){
            var numeroDeBuilder  = _.sum(Game.creeps,       (c) => c.memory.role == 'builder');
            var numeroDeRepairer = _.sum(Game.creeps,       (c) => c.memory.role == 'repairer');
            var numeroDeUpgrader = _.sum(Game.creeps,       (c) => c.memory.role == 'upgrader');
            var numeroDeWarrior =  _.sum(Game.creeps,       (c) => c.memory.role == 'warrior');

            var role = 
                numeroDeHarvesters < MAX_HARVESTER  ? 'harvester':
                numeroDeBuilder    < MAX_BUILDER    ? 'builder': 
                numeroDeRepairer   < MAX_REPAIRER   ? 'repairer':
                numeroDeHarvesterU < MAX_HARVESTER_U? 'harvesterU':
                numeroDeWarrior    < MAX_WARRIOR    ? 'warrior':
                numeroDeUpgrader   < MAX_UPGRADER   ? 'upgrader': 'none';
            if(role=='warrior'){
              options = optionsWarriors;
            }
            if(role != 'none'){
                Game.spawns.Spawn1.createCreep(options,undefined,{role:role,working:false});
                console.log("Screep with role="+ role+" created. Energy consummed ="+ energyNeeded+", energy remaining =", room.energyAvailable);
                console.log("Harvester = "+numeroDeHarvesters+", Builder = "+numeroDeBuilder+", Repairer= "+numeroDeRepairer+", Upgrader ="
                    +numeroDeUpgrader+", HarversterU ="+numeroDeHarvesterU), "Warriors ="+numeroDeHarvesterU;
            }
        }
    }
};