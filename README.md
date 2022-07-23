It will basically be a ready-to-fire, plug-and-play version of the current README.md. Git clone, npm install, enter your password, fire the bot. With best practice in mind. Aim is to make onbording super easy, with rapid ROI. Later will come the hacking, customizations, API documentation reading and interaction with kanasimi/wikiapi project for features requests, PR, etc.

----

**WikiapiJS Eggs** is a ready-to-fire MediaWiki bot toolkit for junior NodeJS developers. It provides the most frequent usecases as demo scripts ("Eggs") to create, read, edit, upload, monitor your wiki. Follow the tutorial below to install, understand, hack and adapt those demo Eggs to your needs. The project is based upon WikiapiJS whose [clean documentation](https://kanasimi.github.io/wikiapi/) allows you to grow freely.

### Installation
Required: `git`, `nodejs`, `npm`.

Setup:
```bash
git clone {url} ./SeaDragonBot  # Create the bot into your ./SeaDragonBot folder
cd ./SeaDragonBot               # Move into folder
npm install                     # Install core dependencies
cp ./tpl/_logins-template.js logins.js
cp ./tpl/_wiki-action-template.js wiki-HACK_ME.js
```

### Starter Eggs
Install and set your credetial into `logins.js`
- [x] wiki-read-one.js
- [x] wiki-read-many.js and save as files.
- [ ] wiki-read_parse-many-keep_section.js and save as files.
- [ ] wiki-read_parse-many-keep_template_data.js and save as files.
- [x] wiki-edit-many.js
- [x] wiki-move-many.js
- [x] wiki-upload-many.js
- [ ] wiki-download-many.js
- [ ] wiki-delete-many.js
- [ ] wiki-protect-many.js
- [x] wiki-monitor-recent_changes.js
- [ ] wiki-monitor-user_creation.js and post welcome message.
- [ ] wikidata-read.js (page, page's property's value)
- [ ] wikidata-modify.js
- [ ] wikidata-modify-lexeme.js

**Eggs' naming convention:**
* ./{target_site}-{action}-{reach}-{details}.js
  * `target_site` (lowercase string): wiki|commons|wp_en|wikt_ja|wikidata|pokemon_wiki|...
  * `action` (lowercase string): read|read_parse|edit|move|upload|monitor|modify|protect|block|...
  * `reach` (lowercase string or empty): one|many|(nothing)
  * `details` (lowercase string): further specific details of the script's mission.

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
		user_name: 'Username Bot',
		password: 'password',
		API_URL : 'https://commons.wikimedia.org/w/api.php'
	},
	// Bot logins, get it via [[Special:BotPasswords]].      <-------- BEST PRACTICE !
	commons: {
		user_name: 'Username Bot@Username_Bot',     // likely something like that
		password: 'long-password',
		API_URL : 'https://commons.wikimedia.org/w/api.php'
	},
};
```
2) Create and init your script using this boilerplate : 
```javascript
// commons-login.js : I just loging into the target wiki.
const Wikiapi= require('wikiapi');
const logins = require('./logins.js');  // Important! Loads your creadentials

(async () => {
    const targetWiki = new Wikiapi;
    // Login credentials from .login*.js
    // https://kanasimi.github.io/wikiapi/Wikiapi.html#login
    await targetWiki.login(logins.commons);
    console.log(`Username ${logins.commons.user_name} is connected !`);

   // CORE ACTION(S) HERE, see the API below.

})();
```

3) You can define your target pages' array in several ways: 
```javascript
/* LIST MANY ************************************************ */
// List of hand-picked pages
	let list = ['Wikipedia:Sandbox/1', 'Wikipedia:Sandbox/2', 'Wikipedia:Sandbox/wikiapi' ];   // array of pages titles
// List pages generated from .js file
	const data   = require('./data/letters.js');  // module.exports = [{'letter': 'a'}, {'letter':'b'}]
	let listPages = data.map(item => `File:Letter-${item.letter}-colorful.svg`);
// List pages in [[Category:Chemical_elements]]
	let listMembers = await wiki.categorymembers('Chemical elements');  // idem
// List intra-wiki links in [[ABC]]
	let listLinks = await wiki.redirects_here('ABC');  // idem
// List of transcluded pages {{w:en:Periodic table}}
	let listTranscluded = await wiki.embeddedin('Template:Periodic table');   // idem
// List of searched pages with expression in its title name
	let listSearch = await wiki.search(' dragon');  // idem
```

4) In the boilerplate above (2), edit the `CORE ACTION(S)` part to do some action on the content :
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
