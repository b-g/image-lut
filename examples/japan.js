"use strict";

var _   = require('lodash');
var ImageLUT = require('../index').ImageLUT;
var lut = new ImageLUT();

var bounds = require('../data/japan_bounds.json')[0];
var countriesList = require('../data/countries_list.json');

var countriesDict = {};
_.each(countriesList, function(row){
	var key = [row.key,row.key,row.key,255].join('/');
	countriesDict[key] = row;
});

lut.init(countriesDict, "../data/japan.png", function (err) {
	lut.domain(
		bounds.upperLeft[0],
		bounds.lowerRight[0],
		bounds.upperLeft[1],
		bounds.lowerRight[1]
	);

	console.log( lut.lookup(138,36) ); // Japan main island
	console.log( lut.lookup(131.2432,25.8444) ); // Japan small island
});
