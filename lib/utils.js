var request = require('request');

var config = require('./config.js');
var celeri = require('celeri');
var fs = require('fs');

module.exports = {
	getContainers: function(cb){
		var spinner = celeri.loading('Fetching containers...');
		request(config.API_URL+'containers/?limit=500&'+config.AUTH, function(error, res, body){

			if(!error && res.statusCode === 200){
				var data = JSON.parse(body), bare_containers=null, containers=null;
				bare_containers = data.objects.filter(function(container){
					return container.is_running;
				});
				containers = bare_containers.map(function(container){
					return {id: container.id, name:container.meta.Name, description: container.description, ip:container.meta.NetworkSettings.IPAddress};
				}).sort(function(a, b){ return a.id-b.id });
				spinner.done();
				cb(null, containers);
			}else{
				spinner.done(false);
				cb(error, null);
			}
		});
	},
	getContainer: function(id, cb){
		var spinner = celeri.loading('Fetching container...');
		request(config.API_URL+'containers/'+id+'/?format=json&'+config.AUTH, function(error, res, body){
			if(!error && res.statusCode === 200){
				var container = JSON.parse(body);
				container = {id: container.id, name:container.meta.Name, description: container.description, ip:container.meta.NetworkSettings.IPAddress};
				cb(null, container);
				spinner.done();
				
			}else{
				spinner.done(false);
				cb(error, null);
			}
		});
	},
	processEnd: function(err){
		if (err) {
			console.error(err);
			process.exit(1);
		} else {
			process.exit(0);
		}
	},
	getPort: function(cb){
		var ex = fs.exists(config.PORTFILE, function(ex){
			if(ex){
				var portf = JSON.parse(fs.readFileSync(config.PORTFILE));
				portf.port++;
				cb(null, portf.port);
				fs.writeFileSync(config.PORTFILE, JSON.stringify(portf));
			}else{
				var portf = {};
				portf.port = config.BASEPORT;
				cb(null, portf.port);
				fs.writeFile(config.PORTFILE, JSON.stringify(portf), function(err){
					console.log(err);
				});
			}
		});
		

	}

};