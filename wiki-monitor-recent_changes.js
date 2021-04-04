// PURPOSE: Script reads targets, print wikicode content into text files.
// Run: $node wiki-upload-many.js
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
// Listen to new edits, check every 2 minutes
    wiki.listen(function for_each_row() { ... }, {
        delay: '2m',
        filter: function filter_row() { ... },
        // get diff
        with_diff: { LCS: true, line: true },
        namespace: '0|talk',			// <------------------- what is that
    });
/* END CORE ****************************************************** */
/* *************************************************************** */

})();

// For details, see documentation : https://kanasimi.github.io/wikiapi/