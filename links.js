module.exports = {
    run: function(room){
        const linkFrom = Game.rooms[room].lookForAt('structure', 23, 44)[0];
        const linkTo = Game.rooms[room].lookForAt('structure', 13, 33)[0];
        if(linkTo.energy <790){
            linkFrom.transferEnergy(linkTo);
        }
    }
};