var MIN_WALL_HITS = 3000;

module.exports = {
    run : function(room){
        var towers = Game.rooms[room].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}})
        towers.forEach(tower => {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                Game.notify('Enemy creep spotted',180 );
                tower.attack(closestHostile);
            }
            if(tower.store.getFreeCapacity(RESOURCE_ENERGY) < 500 ){
                var closestDamagedWall = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < MIN_WALL_HITS && structure.structureType == STRUCTURE_WALL
                });
                var closestDamagedRampart = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < MIN_WALL_HITS && structure.structureType == STRUCTURE_RAMPART
                });
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < structure.hitsMax && structure.structureType != STRUCTURE_WALL
                });
                if (closestDamagedWall) {
                   tower.repair(closestDamagedWall);
                }
                if (closestDamagedRampart) {
                   tower.repair(closestDamagedRampart);
                }
                if (closestDamagedStructure) {
                   tower.repair(closestDamagedStructure)
                }
            }
        })
    }
};