// @flow
"use strict";

import chalk from 'chalk';

class ColoredString {

	static format(color, ...args) {
		return color(args);
	}

	static blue = chalk.blue;
	static yellow = chalk.yellow;
	static red = chalk.red;
	static green = chalk.green;
	static white = chalk.white;
	static bold = chalk.bold;

}

export default ColoredString;
