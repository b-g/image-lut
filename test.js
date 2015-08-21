"use strict";

var expect = require('chai').expect;
var path   = require('path');
var _   = require('lodash');

var ImageLUT = require('./index').ImageLUT;
var rgbToNumber = require('./index').rgbToNumber;
var numberToRgb = require('./index').numberToRgb;


describe('ImageLUT', function () {
	var lut = null;
	before(function () {
		lut = new ImageLUT();
	});
	describe('#init', function () {
		it('should load a gray 8bit image',function(done){
			lut.init(null, path.join(__dirname, "data/countries.png"), function (err) {
				expect(err).to.be.an('undefined');
				var info = lut.size();
				expect(info.width).to.equal(2048);
				expect(info.height).to.equal(1024);
				expect(info.channels).to.equal(1);
				done();
			});
		});
		it('should load a rgb image',function(done){
			lut.init(null, path.join(__dirname, "data/colors.png"), function (err) {
				expect(err).to.be.an('undefined');
				var info = lut.size();
				expect(info.width).to.equal(640);
				expect(info.height).to.equal(480);
				expect(info.channels).to.equal(3);
				done();
			});
		});
	});

	describe('#pixel', function () {
		before(function (done) {
			lut.init(null, path.join(__dirname, "data/colors.png"), function (err) {
				done();
			});
		});
		it('should get raw rgb value',function(){
			var rgba = lut.pixel(85,337);
			var r = (rgba >> 24) & 0xFF;
			var g = (rgba >> 16) & 0xFF; 
			var b = (rgba >> 8) & 0xFF;
			var a = rgba & 0xFF;
			expect(r).to.equal(132);
			expect(g).to.equal(126);
			expect(b).to.equal(64);
			expect(a).to.equal(255);
		});
		it('should get raw rgb value',function(){
			var rgba = lut.pixel(442,337);
			var r = (rgba >> 24) & 0xFF;
			var g = (rgba >> 16) & 0xFF; 
			var b = (rgba >> 8) & 0xFF;
			var a = rgba & 0xFF;
			expect(r).to.equal(122);
			expect(g).to.equal(126);
			expect(b).to.equal(13);
			expect(a).to.equal(255);
		});		
	});

	describe('#color', function () {
		describe('RGB', function () {
			before(function (done) {
				lut.init(null, path.join(__dirname, "data/colors.png"), function (err) {
					done();
				});
			});
			it('should get rgba array',function(){
				var rgbaArray = lut.color(442,337);
				expect(rgbaArray[0]).to.equal(122);
				expect(rgbaArray[1]).to.equal(126);
				expect(rgbaArray[2]).to.equal(13);
				expect(rgbaArray[3]).to.equal(255);
			});
		});
		describe('Gray 8bit', function () {
			before(function (done) {
				lut.init(null, path.join(__dirname, "data/countries.png"), function (err) {
					done();
				});
			});
			it('should get rgba array',function(){
				var rgbaArray = lut.color(1047,257);
				expect(rgbaArray[0]).to.equal(72);
				expect(rgbaArray[1]).to.equal(72);
				expect(rgbaArray[2]).to.equal(72);
				expect(rgbaArray[3]).to.equal(255);
			});
		});
	});

	describe('#lookup', function () {
		describe('Gray 8bit', function () {
			before(function (done) {
				var countriesList = require('./data/countries_list.json');
				var countriesDict = {};
				_.each(countriesList, function(row){
					var key = [row.key,row.key,row.key,255].join('/');
					countriesDict[key] = row;
				});
				lut.init(countriesDict, path.join(__dirname, "data/countries.png"), function (err) {
					done();
				});
			});
			it('should lookup a value',function(){
				expect( lut.lookup(0,0) ).to.be.an('undefined');
				expect( lut.lookup(1078,215).name ).to.equal('Liechtenstein');
				expect( lut.lookup(1047,257).name ).to.equal('Spain');
				expect( lut.lookup(1081,213).name ).to.equal('Germany');
			});
		});
	});

	describe('#domain', function () {
		describe('Gray 8bit', function () {
			var countriesBounds = require('./data/countries_bounds.json')[0];
			var countriesList = require('./data/countries_list.json');
			before(function (done) {
				var countriesDict = {};
				_.each(countriesList, function(row){
					var key = [row.key,row.key,row.key,255].join('/');
					countriesDict[key] = row;
				});
				lut.init(countriesDict, path.join(__dirname, "data/countries.png"), function (err) {
					done();
				});
			});
			it('should set an input domain',function(){
				lut.domain(
					countriesBounds.upperLeft[0],
					countriesBounds.lowerRight[0],
					countriesBounds.upperLeft[1],
					countriesBounds.lowerRight[1]
				);
				var d = lut.domain();
				expect(d.xStart).to.equal(countriesBounds.upperLeft[0]);
				expect(d.xEnd).to.equal(countriesBounds.lowerRight[0]);
				expect(d.yStart).to.equal(countriesBounds.upperLeft[1]);
				expect(d.yEnd).to.equal(countriesBounds.lowerRight[1]);
			});
			it('should lookup a value with set domain',function(){
				expect( lut.lookup(6.074,49.787).name ).to.equal('Luxembourg');
				expect( lut.lookup(0,52).name ).to.equal('United Kingdom');
				expect( lut.lookup(103.809408145,1.34505369037).name ).to.equal('Singapore');
				expect( lut.lookup(-160.204413038,21.8465267725).name ).to.equal('United States of America');
				expect( lut.lookup(0,0) ).to.be.an('undefined');
			});
		});
	});
});

describe('rgbToNumber', function () {
	it('should convert an r,g,b,a to number',function(){
		expect( rgbToNumber(64,177,251,255) ).to.equal(1085406207);
	});
});

describe('numberToRgb', function () {
	it('should convert a number to [r,g,b,a]',function(){
		var a = numberToRgb(1085406207)
		expect(a.length).to.equal(4);
		expect(a[0]).to.equal(64);
		expect(a[1]).to.equal(177);
		expect(a[2]).to.equal(251);
		expect(a[3]).to.equal(255);
	});
});
