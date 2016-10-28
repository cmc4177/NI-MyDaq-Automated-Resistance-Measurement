/*
 * PNX Utils
 * @author Keegan Watkins 
 * 
 * Provides a toolbox for common tasks, i.e. cookies and popups
 */

// Namespace
var PNX = PNX || {};
PNX.utils = {};

(function(utils) {
	// Shortcuts
	var _encode = encodeURIComponent, 
		_decode = decodeURIComponent,
		_trim = $.trim,
		_merge = $.extend;

	// Returns the value of a given cookie, or null
	var _get = function(name) {
		var cookies = document.cookie.split( ";" ),
			cookie,
			cookieName,
			cookieValue;

		for (var i = 0, len = cookies.length; i < len; i++) {
			cookie = cookies[ i ].split( "=" );
			cookieName = _trim( cookie[0] );
			cookieValue = _decode( cookie[1] );
			if (cookieName === name) {
				return cookieValue;
			}
		}

		return null;
	};

	// Sets the complete, formatted cookie string 
	var _set = function(name, value, options) {
		var settings = [name + "=" + _encode( value ) ];
		
		options.path && settings.push( "path=" + options.path );
		options.domain && settings.push( "domain=" + options.domain );
		options.expires && settings.push( "expires=" + options.expires )
		options.secure === true && settings.push( "secure" );
		
		document.cookie = settings.join("; ");
	};

	// Public API
	var Cookie = utils.Cookie = {

		// The default settings to use for cookies, can be globally overwritten
		// by accessing NICore.cookie.defaults
		defaults: {
			path: "",
			domain: "",
			expires: "",
			secure: false
		},

		// Returns the cookie value for the given name, or null
		get: function(name) {
			return _get( name );
		},

		// Sets the cookie value for the given name
		set: function(name, value, options) {
			_set(name, value, _merge( {}, Cookie.defaults, options ));
			// Allow chaining
			return this;
		},

		// Removes the cookie value with the given name.
		remove: function(name, options) {
			// Merge the options with a date in the past, then merge with the
			// defaults (to allow path/domain/secure settings, which may be
			// needed to remove a cookie).
			var settings = _merge( {}, Cookie.defaults, 
				_merge( {}, options, {
					expires: (new Date(0)).toGMTString()
				})
			);
			// Allow chaining
			return Cookie.set( name, "", settings );
		}
	};
})( PNX.utils );

(function(utils) {
	
	// Creates and returns a popup window
	utils.Popup = function(url, title, options) {
		var arr = [];
		for (var prop in options) {
			options.hasOwnProperty(prop) && options[prop] && arr.push(prop + "=" + options[prop])
		}
		
		return window.open(url, title, arr.length ? arr.join(", ") : "");
	};
	
})( PNX.utils );
