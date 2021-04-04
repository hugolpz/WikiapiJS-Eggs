// PURPOSE: Script to upload targets using an external data file.
// Run: $node wiki-upload-many.js
const Wikiapi= require('wikiapi');
const logins = require('./logins.js');
const letters= require('./data/letters.js');  // <----------------- data from there

// Login credentials from .login*.js
var USER = logins.commons.user,
	PASS = logins.commons.pass,
	API  = logins.commons.api;

(async () => {
    // Connect
    const targetWiki = new Wikiapi;
    await targetWiki.login(USER, PASS, API);
    console.log(`Username ${USER} is connected !`);

/* *************************************************************** */
/* CORE ACTION(S) HERE : HACK ME ! ******************************* */
    // Set upload parameters, maily for licensing reasons.
    // Note: parameter `text`, filled with the right wikicode `{{description|}}`, can replace most parameters.
    let options = {
        description: 'The letter',
        author: '[[User:user]]',
        date: new Date() || '2021-01-01',
        source_url: 'https://github.com/kanasimi/wikiapi',
        permission: '{{cc-by-sa-2.5}}',
        other_versions: '',
        other_fields: '',
        license: ['{{cc-by-sa-2.5}}'],
        categories: ['[[Category:${USER} test: upload]]'],
        bot: 1,
        tags:"tag1|tag2",
    };

    for(i=0;i<letters.length;i++){
        // Upload file from URL
        let result = await wiki.upload({
            file_path: `./media/${letters[i]}.svg`,
            filename: `Letter-${letters[i]}-black-on-white.svg`,  // default : keep filename
            comment: 'Test upload with bot.',
            ignorewarnings: 1,  // overwrite
            ...options,
            description: `The letter ${letters[i].letter}, in black on white.`,
            author: `${letters[i].author} the Great, Queen of Testers!`,
        });
    }
/* END CORE ****************************************************** */
/* *************************************************************** */

})();