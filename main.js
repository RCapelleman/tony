var roleHarvester = require("role.harvester");
var roleUpgrader = require("role.upgrader");
var roleBuilder = require("role.builder");
var roleRepairer = require("role.repairer");
var utils = require("utils");

module.exports.loop = function(){
    utils.cleanDeadCreep();
    var creep;
    for(let name in Game.creeps) {
      creep = Game.creeps[name];
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
            console.log("Role not present :", creep.memory.role);
        }
    }
    utils.createCreep(creep.room);
}