module.exports = {
    run: function(room){
        const container = Game.rooms[room].lookForAt('structure', 24, 44)[0];
        const linkTo = Game.rooms[room].lookForAt('structure', 23, 44)[0];
        if(linkTo.energy <790){
            //container.transferEnergy(linkTo);
        }
    }
};