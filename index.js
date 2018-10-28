const CommandLineArgs = require("command-line-args");
const CommandLineUsage = require("command-line-usage");
const commandLineOptions = require("./src/command-line-options");
const usageSections = require("./src/usage-sections");
const VTProcessor = require("./src/core/VTProcessor");


const Log = require("./src/core/Log");

try {

	const options = CommandLineArgs(commandLineOptions);

	if(options.help) {

		const usage = CommandLineUsage(usageSections)
		console.log(usage)

	} else if(options.mbtiles) {

		if(options.style) {

			VTProcessor.slim(options.mbtiles, options.style, options.out);

		} else if(options.row) {

			VTProcessor.simplifyTileLayer(options.mbtiles, parseInt(options.zoom), 
				parseInt(options.column), parseInt(options.row), 
				options.layer, parseFloat(options.tolerance));

		} else {

			// Examination mode
			VTProcessor.showInfo(options.mbtiles)

		}

	} else {

		Log.info("Wrong usage. Use -h to see the valid arguments.")

	}

} catch(err) {

	Log.error(err);

}