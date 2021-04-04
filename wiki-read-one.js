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
    let page_data = await wiki.page('Universe', {}); // default option is last revision = {revision: 1}
    console.log(page_data.title+' : '+page_data.wikitext);
/* END CORE ****************************************************** */
/* *************************************************************** */

})();

// For details, see documentation : https://kanasimi.github.io/wikiapi/