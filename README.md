image-lut
=========
Image [Lookup Table](https://en.wikipedia.org/wiki/Lookup_table) library for [Node.js](https://nodejs.org/)

[![Build Status](https://travis-ci.org/b-g/image-lut.svg?branch=master)](https://travis-ci.org/b-g/image-lut)

Install
-------

```
$ npm install image-lut
```

Examples
--------
See the [examples](https://github.com/b-g/image-lut/tree/master/examples) folder or [test.js](https://github.com/b-g/image-lut/blob/master/test.js) for how to use the image-lut.

###Countries Lookup by Lat/Lon

![countries_small](https://cloud.githubusercontent.com/assets/480224/9385018/44742bd0-4754-11e5-8916-8e97b670cc5d.png)

An image with the countries of the world is used to look up country names by latitude/langitude. The image has to be [equirectangular](http://bl.ocks.org/mbostock/3757119) projected and every country has to have an unique RGB value.

```javascript
var ImageLUT = require('image-lut').ImageLUT;
var lut = new ImageLUT();

var countries = {
	// "R/G/B/A" -> value
	"138/138/138/255": "Luxembourg", 
	"82/82/82/255": "United Kingdom"
};

lut.init(countries, "../data/countries.png", function (err) {
	// optional, set input domain of image coordinates 
	lut.domain(-180, 180, 83.6341007, -90);
	
	console.log( lut.lookup(6.074,49.787) ); // Luxembourg
	console.log( lut.lookup(0,52) ); // United Kingdom
});
```
(examples/countries.js)


API
---
### ImageLUT
* `.init(dict, imagePath, callback)`
* `.initSync(dict, imagePath)`
* `.domain(xStart, xEnd, yStart, yEnd)` optional, like [d3.domain](https://github.com/mbostock/d3/wiki/Quantitative-Scales#linear_domain) to set the input domain of the coordinates of the image 
* `.lookup(x,y)` -> value
* `.color(x,y)` -> [r,g,b,a] array
* `.size()` -> image width, hight and channels count
* `.pixel(x,y)` -> RBGA values 4 x 8bit encoded into a single number

### Helpers
* `numberToRgb(rgba)` -> [r,g,b,a] array
* `rgbToNumber(r, g, b, a)` -> rgba number

Tests
-----
```
$ npm install
$ npm test
```

Acknowledgments
---------------
* image-lut is based on the ideas of [Images as datastore](http://well-formed-data.net/archives/808/images-as-datastore) by [Moritz Stefaner](http://truth-and-beauty.net/) and Stephan & Steffen from [Studio NAND](http://www.nand.io/)
* png reading via [pngparse](https://github.com/darkskyapp/pngparse)
