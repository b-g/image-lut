"use strict";

var _   = require('lodash');
var ImageLUT = require('../index').ImageLUT;
var lut = new ImageLUT();

var bounds = require('../data/europe_bounds.json')[0];
var countriesList = require('../data/countries_list.json');

var countriesDict = {};
_.each(countriesList, function(row){
	var key = [row.key,row.key,row.key,255].join('/');
	countriesDict[key] = row;
});

lut.init(countriesDict, "../data/europe.png", function (err) {
	lut.domain(
		bounds.upperLeft[0],
		bounds.lowerRight[0],
		bounds.upperLeft[1],
		bounds.lowerRight[1]
	);

	console.log( lut.lookup(6.074,49.787) ); // Luxembourg
	console.log( lut.lookup(0,52) ); // United Kingdom
	
	console.log( lut.color(6.074,49.787) ); // 138/138/138/255
	console.log( lut.color(0,52) ); // 82/82/82/255
});