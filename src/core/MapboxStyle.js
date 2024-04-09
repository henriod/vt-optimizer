// @flow
"use strict";

import IO from "./IO.js";
import MapboxStyleLayer from "./MapboxStyleLayer.js";

/*
* Loads a Mapbox Style following the specification found in
* https://www.mapbox.com/mapbox-gl-js/style-spec/
*/
export default class MapboxStyle {

	constructor(fileName) {

		this.style = {};
		this.layerNamesBySource = {};
		this.layerDataById = {};
		this.fileName = fileName;

	}

	open() {

		const self = this;

		return new Promise((resolve, reject) => {

			try {

				self.style = JSON.parse(IO.readSync(self.fileName));
				self.layerNamesBySource = self.groupLayerBySource(self.style.layers);
				self.layerDataById = self.mapLayersToObject(self.style.layers);
				delete self.style.layers;

				resolve();

			} catch (err) {

				reject(err);

			}

		});

	}

	groupLayerBySource(layers) {

		return layers.reduce(
			(obj, val) => {

				// According to the spec the background layers
				// don't have a source thus we omit them
				if (val.source) {

					if (!obj[val.source]) {

						obj[val.source] = [];

					}

					obj[val.source].push(val.id);

				}

				return obj;

			},
			{}
		);

	}

	mapLayersToObject(layers) {

		return layers.reduce((obj, val) => {

			const layerName = val["source-layer"];
			const layerData = val;
			if (!obj.hasOwnProperty(layerName)) {

				// Since a source layer can be used in multiple layers,
				// we need to store an array of layer definitions and
				// check everyone of them
				obj[layerName] = [];

			}
			obj[layerName].push(new MapboxStyleLayer(layerData));

			return obj;

		}, {});

	}

	getLayerNamesFromSource(source) {

		const self = this;

		return self.layerNamesBySource[source];

	}

	isLayerVisibleOnLevel(layerName, level) {

		const self = this;
		const layers = self.layerDataById[layerName];
		return layers.some((l) => {

			return (
				l &&
        l.isVisibleOnZoomLevel(level) &&
        l.isRendered(level) &&
        !l.areAllPropertiesFilteredOut()
			);

		});

	}

}
