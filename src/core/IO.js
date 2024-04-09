// @flow
"use strict";

import { readFileSync, copyFileSync as _copyFileSync, unlinkSync } from "fs";

export default class IO {

	static readSync(filename) {

		return readFileSync(filename);

	}

	static copyFileSync(srcFile, destFile) {

		return _copyFileSync(srcFile, destFile);

	}

	static deleteFileSync(fileName) {

		return unlinkSync(fileName);

	}

}
