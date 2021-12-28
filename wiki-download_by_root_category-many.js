// PURPOSE: Script to upload targets using an external data file.
// Run: $node wiki-upload-many.js
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
        filterCategoriesStr = 'cmn', // Category name must contain. Set to null if not required.
        filterFilesStr = 'Assassas'; // File name must contain. Set to null if not required.
        if (!fs.existsSync(directory)){ fs.mkdirSync(directory); }
    // List of categories
    var categories = await targetwiki.categorymembers( masterCategory, { namespace: 'Category' });
    categories = categories.map(o => o.title);
    // Filter categories, if defined
    categories = filterCategoriesStr? categories.filter(item => item.indexOf(filterCategoriesStr)!== -1): categories;
    console.log(`Categories, filtered: ${JSON.stringify(categories)}`)
    // Loop on targets & download
    for(const category of categories) {
        console.log('Category, current target: ', category)
        // ISO 639-3
        var iso = category.split('-')[1];
        // Create directory, conditionally
        if (!fs.existsSync(directory+iso)){ fs.mkdirSync(directory+iso); }
        // List of targets files
        var files = await targetwiki.categorymembers(category, { namespace: 'File' });
        // Filter files, if defined
        files = filterFilesStr? files.filter(item => item.title.indexOf(filterFilesStr)!== -1): files;
        // Loop on targets & download
        for(const item of files){
            try {
                await targetwiki.download(item, { directory: `${directory}${iso}` });
            } catch (error) { console.log(`Download error on ${item.title} : ${error}`) }
        }
    }
/* END CORE ****************************************************** */
/* *************************************************************** */
})();