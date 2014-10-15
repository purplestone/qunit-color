# Qunit-color

A Qunitjs with color log for node dev.

## Getting Started
Install the module with: ``npm i qunit-color``

## Examples

```javascript
var $$Q = require('qunit-color');

$$Q.module( "qunit-color");
$$Q.test('main test', function (assert) {
	assert.ok(true, 'true');
	assert.ok(false, 'false');
	assert.deepEqual('aa bb cc dd','kk cc bb ee ff', 'str diff');
});
$$Q.load();
```
Not show result and expect log:
```javascript
$$Q = require('../qunit-color.js').setColorConf({
	onlyDiff : true
});
```

## Contributing
[quintjs](http://qunitjs.com/) [colors](https://www.npmjs.org/package/colors).

## Release History
--

## License
Licensed under the MIT license.
