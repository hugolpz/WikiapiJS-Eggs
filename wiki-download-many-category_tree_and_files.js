// PURPOSE: Given a root category of media files: list subcategories, recreate tree structure and download all files.
// Run: $node script.js
// Note: see settings section.
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
    // List of categories
    //var categories = (await targetwiki.category_tree('Lingua_Libre_pronunciation', { depth: 1, cmtype: 'subcat', get_flated_subcategories: true })).flated_subcategories;
    //keys=Object.keys(categories)
    //console.log(keys.length+' keys :\n '+JSON.stringify(keys))
    try {
        await targetwiki.download(targetwiki.to_namespace('Lingua_Libre_pronunciation', 'Category'), { directory: './downloads' });
    } catch (error) { console.log(`Download error : ${JSON.stringify(error)}`) }

    /* END CORE ****************************************************** */
/* *************************************************************** */
})();