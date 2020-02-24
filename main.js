var utils = require("utils");
var tower = require("tower");
var links = require("links");
var containers = require("containers");

module.exports.loop = function(){
    utils.cleanDeadCreep();
    utils.giveRoles();
    utils.createCreep();
    links.run("W2N12");
    tower.run("W2N12");
    containers.run("W2N12");
}