// PURPOSE: Edits targets pages defined from required data array.
// Run: $node wiki-upload-many.js
const Wikiapi= require('wikiapi');
const logins = require('./logins.js');
const data   = require('./data/letters.js'); 

// Login credentials from ./login.js
var USER = logins.commons.user,
	PASS = logins.commons.pass,
	API  = logins.commons.api;

(async () => {
    const targetWiki = new Wikiapi;
    await targetWiki.login(USER, PASS, API);
    console.log(`Username ${USER.split('@')[0]} is connected !`);

/* *************************************************************** */
/* CORE ACTION(S) HERE : HACK ME ! ******************************* */
    // Define list of target pages
    var listPages = data.map(item => `File:Letter-${item.letter}-colorful.svg`);
    // Add template {stub}, replace-remove vandalism if any, add category.
    await targetWiki.for_each_page(
        listPages, 
        d => { return d.wikitext   // reuse existing content
            .replace(/poop/gi,'')  // replace-remove vandalism
        	+`\n[[Category:${USER.split('@')[0]} test: edit]]`;   // Append new content (category)
        	},
           {bot: 1, nocreate: 0, minor: 1, summary: 'Add temporary category to ease next step.'}  // edit options
   );
/* END CORE ****************************************************** */
/* *************************************************************** */

})();