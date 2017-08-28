module.exports = function(options, callback) {

	var fs = require('fs');
	var childProcess = require('child_process');
	var path = require('path');

	var args = [options.output];
    if (!!options.multiScreen) {
        args = ["-m", options.output];
    }

	var scrot = childProcess.spawn(path.join(__dirname, "bin", "scrot", "scrot"), args);
	scrot.on('close', function(code, signal) {
		try {
			fs.statSync(options.output);
			callback(null, options); // callback with options, in case options added
		}
		catch(error) {
			callback("file_not_found", null);
		}
	});
};