var config = require('./config.js');
var utils = require('./utils.js');

var util = require('util');

var spawn = require('child_process').spawn;

var portfinder = require('./utils.js');


function link(id, options){
	utils.getContainer(id, function(err, container){
			if(err){ utils.processEnd(err); }
			portfinder.getPort(function (err, localPort) {
				var tunnel_command = util.format("-L%d:%s:%d",localPort, container.ip, options.port);
				var ssh = spawn('ssh', [tunnel_command, options.host, '-l', options.username, '-N'], { stdio: 'inherit' });
				var running = util.format("%s:%d on localhost:%d", container.name, options.port, localPort).green;
				console.log(running);
				process.on('exit', function(){
					ssh.kill('SIGHUP');
				});
			});
		});
}


module.exports = link;