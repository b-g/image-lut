"use strict";

var _   = require('lodash');
var ImageLUT = require('../index').ImageLUT;
var lut = new ImageLUT();

var bounds = require('../data/middle_east_bounds.json')[0];
var countriesList = require('../data/countries_list.json');

var countriesDict = {};
_.each(countriesList, function(row){
	var key = [row.key,row.key,row.key,255].join('/');
	countriesDict[key] = row;
});

lut.init(countriesDict, "../data/middle_east.png", function (err) {
	lut.domain(
		bounds.upperLeft[0],
		bounds.lowerRight[0],
		bounds.upperLeft[1],
		bounds.lowerRight[1]
	);

	console.log( lut.lookup(33.1896,34.9354) ); // Cyprus
	console.log( lut.lookup(34.36523,31.41928) ); // Palestine
});