var roleUpgrader = require("role.upgrader");

module.exports = {
    run: function (creep) {
        if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity ){
            creep.memory.working = true;
        }
        else if(creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }
        if (creep.memory.working == false) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.flags.Flag1);
            }
        }
        else {
            var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if(constructionSite != undefined) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }else{
                    creep.say('Build!!');
                }
            }
            else{
                roleUpgrader.run(creep);
            }
        }

    }
};