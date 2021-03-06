"use strict";

var _   = require('lodash');
var ImageLUT = require('../index').ImageLUT;
var lut = new ImageLUT();

var bounds = require('../data/africa_bounds.json')[0];
var countriesList = require('../data/countries_list.json');

var countriesDict = {};
_.each(countriesList, function(row){
	var key = [row.key,row.key,row.key,255].join('/');
	countriesDict[key] = row;
});

lut.init(countriesDict, "../data/africa.png", function (err) {
	lut.domain(
		bounds.upperLeft[0],
		bounds.lowerRight[0],
		bounds.upperLeft[1],
		bounds.lowerRight[1]
	);

	console.log( lut.lookup(17.05078125,-22.5125569) ); // Namibia
	console.log( lut.lookup(28.212890625,-29.64986867) ); // Lesotho
	console.log( lut.lookup(6.602783,0.233458) ); // São Tomé and Principe
});