// PURPOSE: Monitor to identify new users.
// Run: $node {filename}.js
const Wikiapi= require('wikiapi');
const logins = require('./logins.js');

// Login credentials from .login*.js
var USER = logins.commons.user,
	PASS = logins.commons.pass,
	API  = logins.commons.api;

(async () => {
    // Connect
    const wiki = new Wikiapi;
    await wiki.login(USER, PASS, API);
    console.log(`Username ${USER} is connected !`);

/* *************************************************************** */
/* CORE ACTION(S) HERE : HACK ME ! ******************************* */
    // Listen to recent changes.
    // If editor's user_talk is empty, then paste message.
    // Note: parameter `text`, filled with the right wikicode `{{description|}}`, can replace most parameters.
    wiki.listen(async row => {
        const page_data = await wiki.page('User talk:' + row.user);
        if (!page_data.wikitext)
            await wiki.edit_page(page_data, '{{subst:Welcome}}');
    }, {
        delay: '2m',
        rcprop: 'user|timestamp'
    });
    
/* END CORE ****************************************************** */
/* *************************************************************** */
})();

// For details, see documentation : https://kanasimi.github.io/wikiapi/