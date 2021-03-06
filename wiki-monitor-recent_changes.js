// PURPOSE: Script reads Special:RecentChanges for main namespace and associated talkpage.
// Run: $node wiki-monitor-recent_changes.js
const Wikiapi= require('wikiapi');
const logins = require('./logins.js');

// Login credentials from .login*.js
var USER = logins.commons.user,
	PASS = logins.commons.pass,
	API  = logins.commons.api;

(async () => {
    const targetWiki = new Wikiapi;
    await targetWiki.login(USER, PASS, API);
    console.log(`Username ${USER.split('@')[0]} is connected !`);

/* *************************************************************** */
/* CORE ACTION(S) HERE : HACK ME ! ******************************* */
// Listen to new edits, check every 2 minutes
    targetWiki.listen(function for_each_row() { ... }, {
        delay: '2m',
        filter: function filter_row() { ... },
        // get diff
        with_diff: { LCS: true, line: true },
        namespace: '0|talk',	// <-------- Main namespace and its talkpages.
    });
/* END CORE ****************************************************** */
/* *************************************************************** */

})();