// Trim function taken from
// http://blog.stevenlevithan.com/archives/faster-trim-javascript
// Thank you for the quick trim!
String.prototype.trim = function(str) {
	str = str.replace(/^\s+/,'');
	for( var i = str.length - 1 ; i >= 0 ; i--) {
		if(/\S/.test(str.charAt(i))) {
				str = str.substring(0,i+1);
				break;
		}
	}
	return str;
};