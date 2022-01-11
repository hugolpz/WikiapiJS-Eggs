// SCOPE: Lingualibre
// PURPOSE: Given a root category, script list subcategories and download all files from them into dedicated repositories.
// Filter parameters exists, so only parts of the tree may be downloaded if wanted. See section "Settings".
// Run: $node script.js
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
        masterCategory = 'Lingua_Libre_pronunciation', // 'Lingua_Libre_pronunciation-orther'
        spliter = function(str){ return str.indexOf('pronunciation by ')>=0?'pronunciation by ':'-';},
        filterCategoriesStr = 'cmn', // Category name must contain. `false` if not required.
        filterFilesStr = 'Luilui'; // File name must contain. `false` if not required.
        if (!fs.existsSync(directory)){ fs.mkdirSync(directory); }
    // List of categories
    var categories = (await targetwiki.category_tree(masterCategory, { depth: 1, cmtype: 'subcat', get_flated_subcategories: true })).flated_subcategories;
    categories = Object.keys(categories);
    // Filter categories, if defined
    categories = filterCategoriesStr? categories.filter(item => item.indexOf(filterCategoriesStr)!== -1): categories;
    console.log(`Categories, filtered: ${JSON.stringify(categories)}`)
    // Loop on targets & download
    for(const category of categories) {
        console.log('Category, current target: ', category)
        // ISO 639-3
        var subDir = category.split(spliter(category))[1];
        // Create directory, conditionally
        if (!fs.existsSync(directory+subDir)){ fs.mkdirSync(directory+subDir); }
        // List of targets files
        var files = await targetwiki.categorymembers(category, { namespace: 'File' });
        
        console.log(files[0], files[1], files[2])
        // Filter files, if defined
        files = filterFilesStr? files.filter(item => item.title.indexOf(filterFilesStr)!== -1): files;
        console.log(JSON.stringify(files));
        // Loop on targets & download
        for(const item of files){
            try {
                await targetwiki.download(item, { directory: `${directory}${subDir}` });
            } catch (error) { console.log(`Download error on ${item.title} : ${error}`) }
        }
    }
/* END CORE ****************************************************** */
/* *************************************************************** */
})();