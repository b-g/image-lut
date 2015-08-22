image-lut
=========
Image [Lookup Table](https://en.wikipedia.org/wiki/Lookup_table) library for [Node.js](https://nodejs.org/)


Install
-------

```
$ npm install image-lut
```

Examples
--------
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
	lut.domain(-180, 180, 83.6341007, -90); 
	console.log( lut.lookup(6.074,49.787) ); // Luxembourg
	console.log( lut.lookup(0,52) ); // United Kingdom
});
```
(examples/countries.js)


API
---
### ImageLUT

### Helpers

Tests
-----
```
$ npm install
$ npm install -g mocha
$ npm test
```

Acknowledgments
---------------
* image-lut is based on the ideas of [Images as datastore](http://well-formed-data.net/archives/808/images-as-datastore) by [Moritz Stefaner](http://truth-and-beauty.net/) and Stephan & Steffen ([Studio NAND](http://www.nand.io/))
* png reading via [pngparse](https://github.com/darkskyapp/pngparse)
