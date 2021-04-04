
// commons-login.js : I just loging into the target wiki.
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
   // Add template {stub}, replace-remove vandalism if any, add category.
   await wiki.for_each_page(
        'Commons:Sandbox', 
        page_data => { return `{{stub}}\n`+page_data.wikitext.replace(/^/g,'Thanos says: ')+`\n[[Category:${USER} test: edit]]`; }, // new content
           {bot: 1, nocreate: 0, minor: 1, summary: 'Bot test: edit'}  // edit options
   );
/* END CORE ****************************************************** */
/* *************************************************************** */

})();