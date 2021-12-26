// PURPOSE: Script renames targets following hand-coded patterns.
// Run: $node wiki-move-many.js
const Wikiapi= require('wikiapi');
const logins = require('./logins.js');

// Login credentials from .login*.js
var USER = logins.commons.user,
	PASS = logins.commons.pass,
	API  = logins.commons.api;

(async () => {
    // Connect
    const targetWiki = new Wikiapi;
    await targetWiki.login(USER, PASS, API);
    console.log(`Username ${USER.split('@')[0]} is connected !`);

/* *************************************************************** */
/* CORE ACTION(S) HERE : HACK ME ! ******************************* */
    // List of targets
    const list = await targetWiki.categorymembers(`${USER} test: edit`);

    // Loop on targets
    for(i=0;i<list.length;i++){// Set pages titles (current and new), reason and revertReason :
        var currPage = list[i],
            newTitle = currPage.title.replace(/colorful/gi,'rainbow'),     // <------- regex match and replacement patterns 
            reason=`ShufaBot test: renaming file.`,
            revertReason=`ShufaBot test: revert renaming.`;
        console.log(currPage.title,newTitle);
        try{
            // Rename with method `.move_page(curr,new, {options})`
            result = await targetWiki.move_page(
                currPage.title,
                newTitle,
                { reason: reason, noredirect: true, movetalk: true }
            );
        }catch(e){ console.error(e); }
        try{
            // Revert rename with method `.move_to(newname, {options})`
            await targetWiki.page(newTitle);
            result = await targetWiki.move_to(
                currPage.title, 
                { reason: revertReason, noredirect: true, movetalk: true }
            );
        }catch(e){ console.error(e); }   // catch error message if any
        console.log('Done.');
    }
/* END CORE ****************************************************** */
/* *************************************************************** */

})();