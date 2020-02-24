
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
                var res = creep.dismantle(structure);
                console.log("res",res)
                if(res == ERR_NOT_IN_RANGE) {
                    //creep.moveTo(structure);
                }
            }
        }
    }
};
