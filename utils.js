var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var rooms = require("rooms");

const BUILDER = 'builder';
const REPAIRER = 'repairer';
const HARVESTER = 'harvester';
const UPGRADER = 'upgrader';
const HARVESTER_U = 'harvesterU';
const WARRIOR = 'warrior';
const MINOR = 'minor';

const roles = ['builder','repairer','harvester','upgrader','harvesterU','warrior','minor'];
var roomsMap = new Map();

module.exports = {
  initRooms: function(rooms){
    if(undefined != rooms){
      roomsMap.set("W2N12",[1,0,3,2,2,0,0]);
    }
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
            case HARVESTER:
              roleHarvester.run(creep);
              break;
            case HARVESTER_U:
              roleHarvester.harvestUpgrader(creep);
              break;
            case UPGRADER:
              roleUpgrader.run(creep);
              break;
            case BUILDER:
              roleBuilder.run(creep);
              break;
            case REPAIRER:
              roleRepairer.run(creep);
              break;
            case MINOR:
              roleHarvester.mine(creep);
                break;
            case WARRIOR:
              rooms.attackTop(creep);
                break;
            default:
              console.log("Role not present :", creep.memory.role);
              roleBuilder.run(creep);
          }
      }
  },
  createCreep : function(room){
      var creepsValues = roomsMap.get(room);
      var role = 
          _.sum(Game.creeps,   (c) => c.memory.role == HARVESTER)   < creepsValues[roles.indexOf(HARVESTER)]   ? HARVESTER:
          _.sum(Game.creeps,   (c) => c.memory.role == BUILDER)     < creepsValues[roles.indexOf(BUILDER)]     ? BUILDER: 
          _.sum(Game.creeps,   (c) => c.memory.role == REPAIRER)    < creepsValues[roles.indexOf(REPAIRER)]    ? REPAIRER:
          _.sum(Game.creeps,   (c) => c.memory.role == HARVESTER_U) < creepsValues[roles.indexOf(HARVESTER_U)] ? HARVESTER_U:
          _.sum(Game.creeps,   (c) => c.memory.role == WARRIOR)     < creepsValues[roles.indexOf(WARRIOR)]     ? WARRIOR:
          _.sum(Game.creeps,   (c) => c.memory.role == UPGRADER)    < creepsValues[roles.indexOf(UPGRADER)]    ? UPGRADER: undefined;

      var options = this.getBodyParts(role);
      if(undefined != role && undefined == Game.spawns.Spawn1.spawning 
          && this.calculateEnegyNecessary(options) < Game.rooms[room].energyAvailable){
            
        Game.spawns.Spawn1.createCreep(options,undefined,{role:role,working:false});
        console.log("Screep with role="+ role+" created. Energy remaining =", Game.rooms[room].energyAvailable);
        console.log("Harvester = "  +_.sum(Game.creeps,   (c) => c.memory.role == HARVESTER)
          +", Builder = "   +_.sum(Game.creeps,   (c) => c.memory.role == BUILDER)
          +", Repairer= "   +_.sum(Game.creeps,   (c) => c.memory.role == REPAIRER)
          +", Upgrader ="   +_.sum(Game.creeps,   (c) => c.memory.role == UPGRADER)
          +", HarversterU ="+_.sum(Game.creeps,   (c) => c.memory.role == HARVESTER_U))
          +", Warriors ="   +_.sum(Game.creeps,   (c) => c.memory.role == WARRIOR);
      }
  },
  calculateEnegyNecessary: function(array){
      var energyMap = new Map([["MOVE", 50],["WORK", 100],["CARRY", 50],["ATTACK", 80],["HEAL", 250],["TOUGH",10], ["CLAIM", 600]]);
      var sum = 0;
      array.forEach(e => {
          sum += energyMap.get(e.toUpperCase());
      });
      return sum;
  },
  getBodyParts: function(role){
    switch (role) {
      case HARVESTER:
      case HARVESTER_U:
        return [WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE];                 
        break;
      case WARRIOR:
        return [MOVE,MOVE,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,TOUGH,WORK,WORK,WORK,WORK];                 
        break;
      default:
        return [WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE];   
        break;
    }
  }
};