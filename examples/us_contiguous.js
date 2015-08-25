"use strict";

var _   = require('lodash');
var ImageLUT = require('../index').ImageLUT;
var lut = new ImageLUT();

var bounds = require('../data/us_contiguous_bounds.json')[0];
var countriesList = require('../data/countries_list.json');

var countriesDict = {};
_.each(countriesList, function(row){
	var key = [row.key,row.key,row.key,255].join('/');
	countriesDict[key] = row;
});

lut.init(countriesDict, "../data/us_contiguous.png", function (err) {
	lut.domain(
		bounds.upperLeft[0],
		bounds.lowerRight[0],
		bounds.upperLeft[1],
		bounds.lowerRight[1]
	);

	console.log("Point is in the US?");
	console.log(lut.lookup(-75.5918762671,35.9289581967) ? "inside":"outside"); // inside
	console.log(lut.lookup(-76.4960429996, 35.3220517598) ? "inside":"outside"); // ouside
});