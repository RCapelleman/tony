var utils = require("utils");
var tower = require("tower");

module.exports.loop = function(){
    utils.cleanDeadCreep();
    utils.giveRoles();
    utils.createCreep();
    tower.run("W2N12");
}