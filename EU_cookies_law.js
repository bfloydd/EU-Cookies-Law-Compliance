/*!
* Simple EU Cookies Law Compliance without dependencies by cara-tm.com, 2017. MIT license 
*
* @param array List of URLs
*/
function EU_cookies_law (r)
{

	'use strict';
	// Custom preferences part
	var msg = "You refuse external third-party cookies: none, at the initiative of this site, is present on your device.",
	 future = '1 Month',
	no_alowed_cookies = "Currently, your browser is set to disable cookies (check preferences).";
	// End custom part

	// Other variables declaration
	var domain = 
	    	// Current host
	    	window.location.hostname,
	    	// The browser's language preference
		lang = (navigator.language || navigator.browserLanguage),
	    	// Array of 2 caracters country members of the EU
		countries = ['AT','BE','BG','HR','CZ','CY','DK','EE','FI','FR','DE','EL','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','SK','SI','ES','SE','GB','UK'],
		// Current visitor is considered as a member of the EU by default
	    	affected = 1,
	    	// 1 minute delay for the information messages
		seconds = 60,
		minutes = 1,
	    	// HTML links
		accept_cookies = document.getElementById('ok-cookies'),
		refuse_cookies = document.getElementById('no-cookies');

	// Cookies are allowed by the browser
	if (false !== navigator.cookieEnabled) {
		// Loop into the countries array
		for (var i=0; i < countries.length; i++) {
			// If the browser's country language code is found within the array
			if ( countries[i] === lang.substring(0, 2).toUpperCase() ) {
				// Right: change the variable value
				affected !== 0;
				// Stops the loop
				break;
			}
		}

		// Not an EU country member 
		if (affected !== 1) {
			// Remove all messages into the cookies warning
			sanitize_msg('');
			// Loads the ressources
			jsloader(r);
		} else 
			// Verify if there is an existing choice for the current visitor
			check_cookies();

		// Event handler for 'Accept Cookies' link
		accept_cookies.onclick = function (evt) {
			evt.preventDefault();
			launch(evt);
		};
		// The js loader
		function launch () {
			// Trims & converts the string variable to integer
			future = parseInt( future.substring(0, 1) );
			// Creates an internal cookie for next visits
			var expires = new Date( new Date().setMonth( new Date().getMonth() + future) );
			cookie_creation('Ok', expires);
			// Loads external js
			jsloader(r);
			// Removes message warnings
			sanitize_msg('');
		};

		// Envent handler for the 'Refuse Cookies' link
		refuse_cookies.onclick = function (evt) {
			evt.preventDefault();
			// Creates an internal cookie for next visits
			var tomorrow = new Date( new Date().setDate(new Date().getDate() + 1) );

			cookie_creation('No', tomorrow);
			// Changes the message warning
			sanitize_msg(msg);
			// Current page refresh
			window.location='';
		};

		// Gets a cookie
		function getCookie (sName) {
			var oRegex = new RegExp('(?:; )?' + sName + ' = ([^;]*);?');

			if ( oRegex.test(document.cookie) ) 
				return decodeURIComponent(RegExp.$1);
			else 
				return null;
		};

		// Check current website cookie if exists
		function check_cookies () {
			// Launches the counter
			tick();
			if (getCookie(domain) === 'Ok' + domain) {
				// A cookie exists for acceptence 
				sanitize_msg('');
				// Loads external js
				jsloader(r);
			} else if (getCookie(domain) === 'No' + domain) {
				// Displays a message
				sanitize_msg(msg);
			}
		};

		// Cookies creation
		function cookie_creation (c, e) {
			return document.cookie = domain + '=' + encodeURIComponent(c + domain) + ';expires= ' + e.toGMTString();
		}

		// External js loader
		function jsloader (el) {
			// Arrays
			var s = [],
			a = document.getElementsByTagName('script')[0];
			// Loop for scripts to launch
			if ( !window.scriptHasRun ) {
				window.scriptHasRun = true;
				for (var i=0; i < el.length; i++) {
					if (el[i] !== 0 || !window.scriptHasRun) {
						window.scriptHasRun = true;
						s[i] = document.createElement('script');
						s[i].src = el[i];
						document.getElementsByTagName('head')[0].appendChild(s[i]) || a.parentNode.insertBefore (s[i], a);
					}
				}
			}
		}

		// Counter creation
		function tick () {

			if( minutes != 0 && null !== document.getElementById('counter') ) {
				var counter = document.getElementById('counter'),
					current_minutes = minutes - 1;
					seconds--;

				if (typeof counter.innerHTML !== null)
					counter.innerHTML = current_minutes.toString() + ':' + (seconds < 10 ? '0' : '') + String(seconds);

				if (seconds > 0) {
					setTimeout (tick, 1000);
				} else {
					if (minutes > 1) {
						countdown(minute - 1);
					}
				}

				if (seconds == 0) {
					launch();
					sanitize_msg('');
				}

			} else 
				// Removes the numbers into the 'cookies-delay'
				document.getElementById('cookies-delay').innerHTML = '';
		}

	} else 
		// Display a message for no cookies allowed by the browser
		sanitize_msg(no_alowed_cookies);

	// Messages loader
	function sanitize_msg (m) {
		// Removes the content into 'cookies-delay'
		document.getElementById('cookies-delay').innerHTML = '';
		// And replaces it by the 'm' parameter
		return document.getElementById('cookie-choices').innerHTML = m;
	}
};
