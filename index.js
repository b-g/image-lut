var pngparse = require("pngparse")
 
function ImageLUT() {
	this.img = null;
	this.dict = null;
	this.inputDomain = null;
};

ImageLUT.prototype.init = function(dict, imagePath, done) {
	var that = this;
	that.dict = dict;
	// console.time("ImageLUT --> Image loaded");
	pngparse.parseFile(imagePath, function(err, img) {
		if (err) {
			console.error("ImageLUT --> Bad image path");
			done(err);
		}
		// console.timeEnd("ImageLUT --> Image loaded");
		// console.info("ImageLUT -->", imagePath, img.width, "x", img.height, img.channels);
		that.img = img;
		done(undefined);
	})
};

ImageLUT.prototype.domain = function(xStart, xEnd, yStart, yEnd) {
	if (arguments.length === 0) return this.inputDomain;
	this.inputDomain = {
		xStart: xStart,
		xEnd: xEnd,
		yStart: yStart,
		yEnd: yEnd
	};
	return this.inputDomain;
};

ImageLUT.prototype._getPixel = function(x,y) {
	if (this.inputDomain) {
		var newX = ~~ map(x,this.inputDomain.xStart,this.inputDomain.xEnd,0,this.img.width);
		var newY = ~~ map(y,this.inputDomain.yStart,this.inputDomain.yEnd,0,this.img.height);
		return this.img.getPixel(newX,newY);
	} else {
		return this.img.getPixel(x,y);
	}
};

ImageLUT.prototype.lookup = function(x,y) {
	return this.dict[this.color(x,y).join('/')];
};

ImageLUT.prototype.pixel = function(x,y) {
	return this._getPixel(x,y);
};

ImageLUT.prototype.color = function(x,y) {
	return numberToRgb(this._getPixel(x,y));
};

ImageLUT.prototype.size = function() {
	return {
		width: this.img.width,
		height: this.img.height,
		channels: this.img.channels
	}
};

function numberToRgb(rgba) {
	return [
		(rgba >> 24) & 0xFF,
		(rgba >> 16) & 0xFF,
		(rgba >> 8) & 0xFF,
		rgba & 0xFF
	];
};

function rgbToNumber(r, g, b, a) {
	return ((r << 24) + (g << 16) + (b << 8) + a);
};

function map(n, start1, stop1, start2, stop2) {
	return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};

module.exports.ImageLUT = ImageLUT;
module.exports.numberToRgb = numberToRgb;
module.exports.rgbToNumber = rgbToNumber;