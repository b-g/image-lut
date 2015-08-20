var ImageLUT = require('../index').ImageLUT;
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
	
	console.log( lut.color(6.074,49.787) ); // 138/138/138/255
	console.log( lut.color(0,52) ); // 82/82/82/255
});