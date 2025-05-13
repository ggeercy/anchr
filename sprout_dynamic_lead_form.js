// Authored by Sprout Studio Inc.
// Last Updated: January 27, 2016
(function() {
	var sprout_script = document.getElementById('sprout_studio_form_script');

	if (sprout_script !== null) {
		var api_key 		= sprout_script.getAttribute('data-api-key'),
			lead_form_id 	= sprout_script.getAttribute('data-lead-form-id'),
			base_hostname 	= sprout_script.getAttribute('data-base-hostname'),
			certification 	= 'https:';

			generateSproutIFrame();
	}

	function generateSproutIFrame() {
		var error 			 = 'Something went wrong. Please contact Sprout Studio for assistance.',
			form_request_url = certification + 'https://api.' + base_hostname + '/leads/viewform/' + api_key + '/' + lead_form_id;

		sprout_iframe = document.createElement('iframe');
		// Define an ID so we can call certain methods on this iFrame with ease
		sprout_iframe.id = 'sprout-iframe';
		// Setting the iFrame SRC attribute to be that of our form_request_url (PROTOCOL + API_REFERENCE + API_KEY + LEAD_FORM_ID)
		sprout_iframe.setAttribute('src', form_request_url);
		// We do not want to show the Frame Border on the iFrame, ever!
		sprout_iframe.frameBorder = 0;
		// Remove the Scrollbar
		sprout_iframe.scrolling = 'no';
		// Because we are setting multiple CSS properties, we can utilize the cssText property to set our Style tag
		sprout_iframe.style.cssText = 'display:block; margin: 0; padding: 0; width: 1px; min-width:100%; height:100%';
		// Append our iFrame to after our Sprout Script
		sprout_script.parentElement.appendChild(sprout_iframe, sprout_script);
	}

	// Creating browser compatible event handlers
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
	var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

	// Listen for a message from the iframe.
	eventer(messageEvent, function(e) {
		// If the origin of the Event comes from anything other than the specified iFrame origin, ignore and do nothing
		if (e.origin !== certification + 'https://api.' + base_hostname || isNaN(e.data)) {
			return;
		} else {
			document.getElementById('sprout-iframe').style.height = e.data + 'px';
		}
	}, false);

})();