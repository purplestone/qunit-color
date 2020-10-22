var $$colors = require('colors');

module.exports = (function () {
	var firstShowOnlyDiff = true;
	/*
	 * Javascript Diff Algorithm
	 *  By John Resig (http://ejohn.org/)
	 *  Modified by Chu Alan "sprite"
	 *
	 * Released under the MIT license.
	 *
	 * More Info:
	 *  http://ejohn.org/projects/javascript-diff-algorithm/
	 */


	function diffString( o, n ) {
	//console.log('((((((((((((('); 
	//console.log(o,n);
	//console.log(')))))))))))');
	  o = o.replace(/\s+$/, '');
	  n = n.replace(/\s+$/, '');

	  var out = diff(o == "" ? [] : o.split(/\s+/), n == "" ? [] : n.split(/\s+/) );
	  var str = "";

	  var oSpace = o.match(/\s+/g);
	  if (oSpace == null) {
		oSpace = ["\n"];
	  } else {
		oSpace.push("\n");
	  }
	  var nSpace = n.match(/\s+/g);
	  if (nSpace == null) {
		nSpace = ["\n"];
	  } else {
		nSpace.push("\n");
	  }

	  if (out.n.length == 0) {
		  for (var i = 0; i < out.o.length; i++) {
			str += (out.o[i] + oSpace[i]).cyan;
		  }
	  } else {
		if (out.n[0].text == null) {
		  for (n = 0; n < out.o.length && out.o[n].text == null; n++) {
			str += (out.o[n] + oSpace[n]).cyan;
		  }
		}

		for ( var i = 0; i < out.n.length; i++ ) {
		  if (out.n[i].text == null) {
			str += (out.n[i] + nSpace[i]).yellow;
		  } else {
			var pre = "";

			for (n = out.n[i].row + 1; n < out.o.length && out.o[n].text == null; n++ ) {
			  pre += (out.o[n] + oSpace[n]).cyan;
			}
			str += " " + out.n[i].text + nSpace[i] + pre;
		  }
		}
	  }
	  
	  return str;
	}

	function diff( o, n ) {
	  var ns = new Object();
	  var os = new Object();
	  
	  for ( var i = 0; i < n.length; i++ ) {
		if ( ns[ n[i] ] == null )
		  ns[ n[i] ] = { rows: new Array(), o: null };
		ns[ n[i] ].rows.push( i );
	  }
	  
	  for ( var i = 0; i < o.length; i++ ) {
		if ( os[ o[i] ] == null )
		  os[ o[i] ] = { rows: new Array(), n: null };
		os[ o[i] ].rows.push( i );
	  }
	  
	  for ( var i in ns ) {
		if ( ns[i].rows.length == 1 && typeof(os[i]) != "undefined" && os[i].rows.length == 1 ) {
		  n[ ns[i].rows[0] ] = { text: n[ ns[i].rows[0] ], row: os[i].rows[0] };
		  o[ os[i].rows[0] ] = { text: o[ os[i].rows[0] ], row: ns[i].rows[0] };
		}
	  }
	  
	  for ( var i = 0; i < n.length - 1; i++ ) {
		if ( n[i].text != null && n[i+1].text == null && n[i].row + 1 < o.length && o[ n[i].row + 1 ].text == null && 
			 n[i+1] == o[ n[i].row + 1 ] ) {
		  n[i+1] = { text: n[i+1], row: n[i].row + 1 };
		  o[n[i].row+1] = { text: o[n[i].row+1], row: i + 1 };
		}
	  }
	  
	  for ( var i = n.length - 1; i > 0; i-- ) {
		if ( n[i].text != null && n[i-1].text == null && n[i].row > 0 && o[ n[i].row - 1 ].text == null && 
			 n[i-1] == o[ n[i].row - 1 ] ) {
		  n[i-1] = { text: n[i-1], row: n[i].row - 1 };
		  o[n[i].row-1] = { text: o[n[i].row-1], row: i - 1 };
		}
	  }
	  
	  return { o: o, n: n };
	}

	return function (oDetails, opts) {
		opts = opts || {};
		var bDebug = false;

		var sDiff = ''
		bDebug && console.log('$$$$$$$$$$$$');
		bDebug && console.log(oDetails);
		bDebug && console.log('%%%%%%%');
		if(('expected' in oDetails) && !oDetails.result) {
			bDebug && console.log('--------------');
			var as = JSON.stringify( oDetails.actual, 0, 4 );
			if(as === undefined) {
				as = 'undefined';
			}else if(Object.prototype.toString.call(oDetails.actual) === '[object String]') {
				as = oDetails.actual;
			}
			bDebug && console.log(as);
			bDebug && console.log(typeof as);
			bDebug && console.log('=========');


			bDebug && console.log('~~~~~~~~~~~~~~');
			var es = JSON.stringify( oDetails.expected, 0, 4 );
			if(es === undefined) {
				es = 'undefined';
			}else if(Object.prototype.toString.call(oDetails.expected) === '[object String]') {
				es = oDetails.expected;
			}
			var sGap = '\n---------- diff: -----------\n'.grey;
			if(!opts.onlyDiff) {
				sDiff += '---------- result: ---------\n'.grey + as.cyan;
				sDiff += '\n---------- expect: ---------\n'.grey + es.yellow;
			}
			if(opts.onlyDiff && firstShowOnlyDiff) {
				sGap = '\n---------- diff:'.grey+'result'.cyan+'|'+'expect'.yellow+' -----------\n'.grey;
				firstShowOnlyDiff = false;
			}
			sDiff += sGap + diffString(as, es);
			sDiff = '\n' + sDiff;
			
		}
		var sOk;
		var sTips = oDetails.message;
		if(oDetails.result) {
			sOk = ('√ ' + (oDetails.module||'') + ' ' + oDetails.name + ' ').green;
			sTips = sTips ? sTips.green : '';
		}else{
			sOk =  ('× ' + (oDetails.module||'') + ' ' + oDetails.name + ' ').redBG;
			sTips = sTips ? sTips.red : '';
		}
		var sErr = (oDetails.source && '\n' + oDetails.source.magenta) || '';
		
		if (sErr && opts.allErr) {
			console.error(Error(sErr));
		}
		bDebug && console.log(es);
		bDebug && console.log(typeof es);
		bDebug && console.log('^^^^^^^^^^^^^^');
		return sOk + ' ' + sTips + sDiff + sErr;
	};
})();




///////////////////////////////////////////////////////////////////

if(!module.parent) {
	var goTest = function () {
		var $$QunitjsColor = module.exports;

		var $$Q = require('qunitjs');
		QUnit = $$Q;
		$$Q.log(function( details ) {
			console.log($$QunitjsColor(details,{
				onlyDiff : true
			}));
		  //console.log( "Log: ", details.result, details.message );
		});
		$$Q.module( "timing");
		$$Q.test('ttt', function (assert) {
			assert.ok(true, 'true');
			assert.ok(false, 'false');
			assert.deepEqual([1,2,3,4],[
				1,2,3
			], 'arr');
			assert.deepEqual(true,false, 'true,false');
			assert.deepEqual('aa bb cc dd','kk cc bb ee ff', 'str');
			assert.ok(true, 'true');
		});

		QUnit.load();


	};goTest();

}