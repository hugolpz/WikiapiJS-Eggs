// PURPOSE: Script to upload targets using an external data file.
// Run: $node wiki-upload-many.js
const Wikiapi= require('wikiapi');
const logins = require('./logins.js');

// Login credentials from .login*.js
var USER = logins.commons.user,
	PASS = logins.commons.pass,
	API  = logins.commons.api;

(async () => {
    // Connect
    var targetwiki = new Wikiapi;
    await targetwiki.login(USER, PASS, API);
    console.log(`Username ${USER.split('@')[0]} is connected !`);

/* *************************************************************** */
/* CORE ACTION(S) HERE : HACK ME ! ******************************* */
    // List of targets
    const list = await targetwiki.categorymembers(`Category:Lingua Libre pronunciation by Yug`, { namespace: 'File' });
    // Loop on targets & download
    for(const item of list){
        try {
            await targetwiki.download(item, { directory: './downloads' });
        } catch (error) { console.log(`Download error on ${item.title} : ${error}`) }
    }
/* END CORE ****************************************************** */
/* *************************************************************** */

})();