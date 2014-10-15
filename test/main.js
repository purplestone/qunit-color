var assert = require('assert')
	, $$Q = require('../qunit-color.js');
	//, $$Q = require('../qunit-color.js').setColorConf({
		//onlyDiff : true
	//});
;


$$Q.module( "qunit-color");
$$Q.test('main test', function (assert) {
	assert.ok(true, 'true');
	assert.ok(false, 'false');
	assert.deepEqual('aa bb cc dd','kk cc bb ee ff', 'str diff');
});
$$Q.load();

$$Q = require('../qunit-color.js').setColorConf({
	onlyDiff : true
});