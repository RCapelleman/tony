module.exports = {
    run: function (creep) {
        if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity ){
            creep.memory.working = true;
        }
        else if(creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }
        if (creep.memory.working == false) { 
            var link = Game.rooms["W2N12"].lookForAt('structure', 13, 33)[0];
            if(creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.flags.link);
            }
        }
        else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};