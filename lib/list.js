
var Table = require('cli-table');
var program = require('commander');

var utils = require('./utils.js');



function list(){
	utils.getContainers(function(err, containers){
			if(err){ utils.processEnd(err); }
			var table = new Table({ head: ["ID", "Name", "Description", "IP"] });
			containers.forEach(function(container){
				table.push([container.id, container.name, container.description, container.ip]);
			});
			
			console.log(table.toString());

		});
}

module.exports = list;
