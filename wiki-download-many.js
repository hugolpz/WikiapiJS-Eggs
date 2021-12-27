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
/* CORE ACTION(S) HERE : HACK ME ! ******************************* * /
    // List of targets
    const list = await targetwiki.categorymembers(`Category:Lingua Libre pronunciation by Bile rene`, { namespace: 'File' });
    // Loop on targets & save
    for(i=0;i<list.length;i++){// Set pages titles (current and new), reason and revertReason :
        page_data = list[i];
        try {
            await targetwiki.download(page_data, { directory: './downloads' });
        } catch (error) { console.log(`Download error on ${page_data.title} : ${error}`) }
    }
    
*/
    // Download all files from a (Commons) category
for (const page_data of await targetwiki.categorymembers(`Category:Lingua Libre pronunciation by Bile rene`, { namespace: 'File' })) {
	try {
		//if (targetwiki.is_namespace(page_data, 'File'))
		const file_data = await targetwiki.download(page_data.title, { directory: './downloads' });
	} catch (error) { console.log(`Download error on ${page_data.title} : ${error}`) }
}
/* END CORE ****************************************************** */
/* *************************************************************** */

})();