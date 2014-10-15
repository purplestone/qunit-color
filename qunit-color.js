var $$colors = require('colors')
	, $$qunitjs = require('./lib/qunit.js')
	, $$qunitjsRender = require('./lib/qunit-color-render.js')
;


module.exports = (function () {

	var _ = {};
	$$qunitjs.log(function( details ) {
		console.log($$qunitjsRender(details,_.colorConf));
	});
	$$qunitjs.setColorConf = function (opt) {
		_.colorConf = opt;
		return $$qunitjs;
	};
	return $$qunitjs;

}());
