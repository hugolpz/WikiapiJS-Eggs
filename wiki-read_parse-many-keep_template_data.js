// PURPOSE: Script reads target, parses template, reads Infobox templates, convert to JSON.
// Run: $node wiki-read_parse-many-keep_template_data.js
const Wikiapi= require('wikiapi');
const logins = require('./logins.js');

// Login credentials from .login*.js
var USER = logins.commons.user,
	PASS = logins.commons.pass,
	API  = logins.commons.api;

(async () => {
    const targetWiki = new Wikiapi;
    await targetWiki.login(USER, PASS, API);
    console.log(`Username ${USER} is connected !`);

/* *************************************************************** */
/* CORE ACTION(S) HERE : HACK ME ! ******************************* */



/* END CORE ****************************************************** */
/* *************************************************************** */

})();

// For details, see documentation : https://kanasimi.github.io/wikiapi/