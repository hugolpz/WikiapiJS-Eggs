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
    const wiki = new Wikiapi;
    await wiki.login(USER, PASS, API);
    console.log(`Username ${USER.split('@')[0]} is connected !`);

/* *************************************************************** */
/* CORE ACTION(S) HERE : HACK ME ! ******************************* */
    // Set upload parameters, maily for licensing reasons.
    // Note: parameter `text`, filled with the right wikicode `{{description|}}`, can replace most parameters.
    let options = {
        description: 'The letter',
        author: `[[User:${USER.split('@')[0]}|]]`,
        date: new Date().toISOString().split('T')[0],
        //source_url: 'https://github.com/kanasimi/wikiapi',
        permission: 'own work',
        other_versions: '',
        other_fields: '',
        license: ['{{PD-ineligible}}'],
        categories: [`[[Category:${USER.split('@')[0]} test: upload]]`],
        bot: 1,
       // tags:"tag1|tag2",
    };

    for(i=0;i<letters.length;i++){
        // Upload file from URL
        let result = await wiki.upload({
            file_path: `./media/${letters[i].filename}`,
            filename: `Letter-${letters[i].letter}-colorful.svg`,  // default : keep filename
            comment: `Upload colorful letter ${letters[i].letter} for latin alphabet.`,
            ignorewarnings: 1,  // overwrite
            ...options,
            description: `The letter ${letters[i].letter}, in black on white.`,
            author: `[[User:${USER.split('@')[0]}|]]`,
        });
    }
/* END CORE ****************************************************** */
/* *************************************************************** */

})();