var utils = require("utils");
var tower = require("tower");
var links = require("links");
var containers = require("containers");

module.exports.loop = function(){
    utils.initRooms(["W2N12"]);
    utils.cleanDeadCreep();
    utils.giveRoles();
    utils.createCreep("W2N12");
    links.run("W2N12");
    tower.run("W2N12");
    containers.run("W2N12");
}