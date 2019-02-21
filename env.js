const os = require('os');
var ip = os.networkInterfaces().wlp8s0[0].address; 
var env = {
	IP_ADD:ip,
	PORT:8090
}

module.exports = env;


/* Intel Edison depends upon NodeJS server at max v5 and Socket.IO needs to be installed at 
   version 1.3.7 particularly for it to work . Longer versions are not supporyed by default

*/
