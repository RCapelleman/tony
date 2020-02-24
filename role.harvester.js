
var roleBuilder = require("role.builder");


module.exports = {
    run: function (creep) {
        if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity ){
            creep.memory.working = true;
        }
        else if(creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }
        if (creep.memory.working == false) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.flags.source);
            }
        }
        else {
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
    },
    harvestUpgrader: function (creep) {
        if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity ){
            creep.memory.working = true;
        }
        else if(creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }
        if (creep.memory.working == false) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE && source.energy > 0) {
                creep.moveTo(Game.flags.Flag1);
            }
        }
        else {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.id != "5e537abab201e44a6d6d155f" && s.energy < s.energyCapacity && s.structureType == STRUCTURE_LINK
            });
            if(structure == undefined){
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_STORAGE
                });
            }
            if(structure != undefined){
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
        }
    },
    mine: function (creep) {
        if(creep.memory.working == false && creep.carry.energy == creep.carryCapacity ){
            creep.memory.working = true;
        }
        else if(creep.memory.working == true && creep.carry.energy == 0){
            creep.memory.working = false;
        }
        console.log("Mon mineur est:", creep.name);
        if (creep.memory.working == false) {
            var source = creep.pos.findClosestByPath(FIND_MINERALS);
            console.log("Minor source = ", source);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER
            });
            if(structure != undefined){
                if (creep.transfer(structure, RESOURCE_HYDROGEN) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }else{
                roleBuilder.run(creep);  
            }
        }
    }
};