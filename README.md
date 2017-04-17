# EU Cookies Law Compliance
A simple third part javascripts loader for the EU Cookies law with no dependencies ([online demo](http://eu-cookies-law.cara-tm.com/)).

What this simple script is doing?

* Based on a simple HTML markup with full customization and parameters;
* Supports l10n and translations;
* Checks the browser's language preference to detect visitors whos are members of the EU (otherwise no Cookies informations are shown);
* Displays within your website a dual choice for Cookies acceptence or not;
* Loads external javascripts (supposed to use external/cross domains Cookies) on visitor's demand;
* Keeps visitors cookies choice (for a limited time);
* Integrates a counter timer and automatic loading for external javascripts after a delay;
* Prepares a cup of coffee for your morning breakfast (washing-machine option planned for future versions).

## How to use it?

Just put this HTML markup into your page(s):

    <div id="msg-cookies"></div>

		<p id="cookie-choices">This website stores some third parts cookies within your device. You can <a href="#!" title="J'accepte de recevoir des Cookies" id="ok-cookies">Accept</a> or <a href="#!" title="Je refuse l'usage de Cookies" id="no-cookies">Refuse</a> them. 
    <p id="cookies-delay">Time remaining before Cookies automatic launch: <span id="counter">1:00</span></p>

And just before the last `</body>` tag place the EU Cookies Law Compliance script and set the external scripts into its array:

    <script type="text/javascript" src="js/EU_cookies_law.min.js"></script>
    <script>
    // Array of third part JS files to load (with external cookies) if only the 'Cookies Choice' button is accepted by visitors or after a delay if the counter feature is enabled:
    EU_cookies_law(["js/google-analytics.js", " "]);

    </script>

That's it!

## How to customize?

Check the [first script code line](https://github.com/cara-tm/EU-Cookies-Law-Compliance/blob/master/EU_cookies_law.min.js#L2):

    var msg="Vous refusez les cookies tiers externes : aucun, à l'initiative de ce site, n'est présent sur votre appareil.",
    future='1 Month',
    minutes=1;

* `msg` (string): the message shown (into the `<div id="msg-cookies"></div>`) when a vistor refuses the use of Cookies (with translations support).
* `future` (string or integer): delay (in months) to keep the visitor's choice. If the 'Cookie Choice' is accepted, nothing will be shown to the visitor for next visits; in the other hand, the `msg` variable content will be shown.
* `minutes` (integer): delay (in minutes) for the automatic scripts launcher. If set to `0` the counter will not be shown. Note: the elapsed time appears until it finishes, after that the external scripts are loaded and all messages will be hidden.
