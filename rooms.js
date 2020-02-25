
module.exports = {
    attackTop: function(creep){
        var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.id == "5e4f0ddd0cb2377bf7a53f2f"
        });
        const path = creep.pos.findPathTo(Game.flags.attack);
        if(path.length > 0) {
            creep.move(path[0].direction);
        }else{
            if(structure) {
                // dismantle()  for wall/Road/container ==> need work 
                // atack()      for ennemy creep        ==> need attack body
                if(creep.dismantle(structure) == ERR_NOT_IN_RANGE) {
                   // creep.moveTo(structure);
                }else{
                    //creep.say('Attack!!');
                }
            }
        }
    },
    harvestFlag: function(creep, roomTarget){
        if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity ){
            creep.memory.working = true;
        }
        else if(creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }
        if (creep.memory.working == false) {
            if(creep.pos.roomName != roomTarget){
                creep.moveTo(new RoomPosition(25, 25, roomTarget))
            }else{
                var source = creep.pos.findClosestByPath(FIND_SOURCES);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.flags.Flag1);
                }
            }
        }else{
            if(creep.pos.roomName != "W2N12"){
                creep.moveTo(new RoomPosition(29, 16, 'W2N12'))
            }else{
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => s.energy < s.energyCapacity && s.structureType != STRUCTURE_LINK
                });
                if(structure != undefined){
                    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }else{
                    roleBuilder.run(creep);  
                }
            }
        }
    }
};
