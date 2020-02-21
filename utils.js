module.exports = {
    log : function(creep){
        console.log("name", creep.name);
        console.log("role", creep.memory.role);
        console.log("working", creep.memory.working);
        console.log("position", creep.pos);
    }
    
    //creep.moveTo(new RoomPosition(25, 20, 'W10N5'));
};