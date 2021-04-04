It will basically be a ready-to-fire, plug-and-play version of the current README.md. Git clone, npm install, enter your password, fire the bot. With best practice in mind. Aim is to make onbording super easy, with rapid ROI. Later will come the hacking, customizations, API documentation reading and interaction with kanasimi/wikiapi project for features requests, PR, etc.

----

**WikiapiJS Eggs** is a kick starter toolkit allowing junior (JS) developers to become Bot Master on any MediaWiki. It is done by hacking provided core scripts to create, read, edit, upload, monitor your wiki, and adapting those to your needs. The project is organized around classic usecases coded into respective files. Do you have some repeatitive action in mind to maintain your wiki ? Find the script the closest to your project, explore it, and hack it to fit your needs.
The project is based upon WikiapiJS, an elegant NodeJS modules to edit wikis through their Web API.

### Installation
Dependencies: `git`, `nodejs`, `npm`.

Setup:
```bash
git clone {url} ./SeaDragonBot  # Create the bot folder
cd ./SeaDragonBot               # Move into folder
npm install                     # Install core dependencies
cp ./tpl/_logins-template.js logins.js
cp ./tpl/_wiki-action-template.js wiki-HACK_ME.js
```

### Structures
**Templates**
- [x] logins.js : _your credentials to add there._
- [x] wiki-NEXT.js : _your next code._

This project currently provides the following scripts, already working, and ready to hack further :
- [x] wiki-read.js
- [x] wiki-edit-many.js
- [x] wiki-move-many.js
- [ ] wiki-delete-many.js
- [ ] wiki-monitor-recent_changes.js
- [ ] wiki-monitor-user_creation.js
- [x] wiki-upload-many.js
- [ ] wikidata-read.js (page, page's property's value)
- [ ] wikidata-modify.js
  - [ ] wikidata-modify-lexeme.js

### API documentation
**Open and explore [API documentation](https://kanasimi.github.io/wikiapi/).**

### Init
1) On your wiki, create or own an account. 

2) In `./login.js`, save your username, password, api url. Repeat for each mediawiki & account you want to work with.
```javascript
// login.js : I store your password and should never be git commited ! I should be mentioned in .gitignore .
module.exports = {
	// Human login, get an account via [[Special:CreateAccount]].
	commonsH: {
		user: 'Username Bot',
		pass: 'password',
		api : 'https://commons.wikimedia.org/w/api.php'
	},
	// Bot logins, get it via [[Special:BotPasswords]].      <-------- BEST PRACTICE !
	commons: {
		user: 'Username Bot@Username_Bot',     // likely something like that
		pass: 'long-password',
		api : 'https://commons.wikimedia.org/w/api.php'
	},
};
```
2) Create your script using this boilerplate : 
```javascript
// commons-login.js : I just loging into the target wiki.
const Wikiapi= require('wikiapi');
const logins = require('./logins.js');

// Login credentials from .login*.js
var USER = logins.commons.user,
	PASS = logins.commons.pass,
	API  = logins.commons.api;

(async () => {
    const targetWiki = new Wikiapi;
    await targetWiki.login(USER, PASS, API);
    console.log(`Username ${USER} is connected !`);

   // CORE ACTION(S) HERE, see the API below.

})();
```

3) You can define your target pages via several ways displayed below. 
```javascript
/* LIST MANY ************************************************ */
// List of hand-picked pages
	let list = ['Wikipedia:Sandbox/1', 'Wikipedia:Sandbox/2', 'Wikipedia:Sandbox/wikiapi' ];
// List pages in [[Category:Chemical_elements]]
	let listMembers = await wiki.categorymembers('Chemical elements');  // array of titles
// List intra-wiki links in [[ABC]]
	let listLinks = await wiki.redirects_here('ABC');  // array of titles
// List of transcluded pages {{w:en:Periodic table}}
	let listTranscluded = await wiki.embeddedin('Template:Periodic table');
// List of searched pages with expression in its title name
	let listSearch = await wiki.search(' dragon');  // array of titles
```

4) In the boilerplate above (2), edit the `CORE ACTION(S)` part to do some action ! Example :
```javascript
// List members of target [[Category:Chemical_elements]]
let listMembers = await wiki.categorymembers('Chemical elements');  // array of titles
// Add template {stub}, replace-remove vandalism if any, add category.
await wiki.for_each_page(
	listMembers, 
	page_data => { return `{{stub}}\n`+page_data.wikitext.replace(/^/g,'Thanos says: ')+`\n[[Category:Bot test: edit]]`; }, // new content
		{bot: 1, nocreate: 0, minor: 1, summary: 'Bot test: edit'}  // edit options
);
```
Full egg's script is visible in wiki-edit_many.js, you are encouraged to hack that file to fit your needs.
See more on [WikiapiJS documentation](https://kanasimi.github.io/wikiapi/).

4) Bot review and authorization may be needed in order to mass edit on your target wiki. On Wikimedia's Wikis, search for "Bots/Requests" (ex: [Commons](https://commons.wikimedia.org/wiki/Commons:Bots/Requests), [wp:en:](https://en.wikipedia.org/wiki/Commons:Bots/Requests)). Follow instruction as required to get your bot approved. Depending on your missions (upload, move page, delete), ask for temporary user-rights so you may demo your skillful usage of these user-rights.


### Framework's documentation
- [WikiapiJS documentation](https://kanasimi.github.io/wikiapi/)