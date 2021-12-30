// SCOPE: Lingualibre
// PURPOSE: Given a root category, script list subcategories and download all files from them into dedicated repositories.
// Run: $node script.js
// Note: see settings section.
const fs = require('fs');
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
    // Settings
    var directory = './downloads/',
        masterCategory = 'Lingua_Libre_pronunciation',
        filterCategoriesStr = 'cmn', // Category name must contain. `false` if not required.
        filterFilesStr = 'Assassas'; // File name must contain. `false` if not required.
        if (!fs.existsSync(directory)){ fs.mkdirSync(directory); }
    // List of categories
    var categories = (await targetwiki.category_tree(masterCategory, { depth: 1, cmtype: 'subcat', get_flated_subcategories: true })).flated_subcategories;
    keys=Object.keys(categories)
    console.log(keys.length+' keys :\n '+JSON.stringify(keys))
    
/* END CORE ****************************************************** */
/* *************************************************************** */
})();