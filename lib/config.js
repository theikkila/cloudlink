

var config = {
	USERNAME: "root",
	HOST: "dockerhost.example.com",
	API_USERNAME: "admin",
	API_KEY: "checkitfromshipyard",
	API_URL: "http://shipyardhost:8000/api/v1/",
	PORTFILE: process.env['HOME']+"/.cloudlink.json",
	BASEPORT: 8000
};

config.AUTH = "username="+config.API_USERNAME+"&api_key="+config.API_KEY;

module.exports = config;