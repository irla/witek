Witek
=====

### Simple MVC for node and express

Witek has two functions - he initialise controllers and load config files.

### Installation

    $ npm install witek --save

(`--save` automatically writes to your `package.json` file, tell your friends)

### Start

Traditional `app.js` is used as a starting point of the app, but anything what is required is to tell Witek to load config files.

    var app = require('express')();
    require('witek').load(app, __dirname + '/config');

### Config load

Config structure is based on locomotivejs framework. Witek expects to have config folder strucuture as folows:

     # config
       # enfironment
          - all.js
          - development.js
          - stage.js
          - live.js
       # initilizers
          - 01_view_engine.js
          - 02_auth.js
          - 10_controllers.js
          - 99_last.js

At first it loads enviroment depend file from `environment` folder, then `all.js` file is loaded. These files are good place to set express variables.

    /** This is the content of development.js file */
    module.exports = function(app) {
        app.set('mongodb-uri', 'mongodb://localhost:27017/WitekDB');       
    };
    
After loading enviroment depended configs, initilizers are loaded (in alphabetical order).

    /* Content of 01_view_engine.js */
    var ejslocals = require('ejs-locals');
    module.exports = function(app) {
        app.set('views', __dirname + '/../../views');
        app.set('view engine', 'ejs');
        app.engine('ejs', ejslocals);
    };
    
### Controllers load

To load controllers one of initializers can be used. Here `10_controllers.js`:

    var witek = require('witek');
    module.exports = function(app) {
        witek.controllers(app, {
            controllers: app.get(__dirname + '/../../controllers'),
            viewSuffix: 'html.ejs'
        });
    };
    
    
### Controllers description

Controller should be simple JavaScript object, it's functions will be automatically mapped to url. Let's say we have controller with name `example_controller.js` action below - 

    exports.actions = {
       'example_action': function(req, res, next) { }; 
    };
    
will be mapped to GET http://yourapphost/example_controller/example_action

#### REST actions

Witek define 7 default actions which are treated as default REST actions. Name of controller is `albums.js`.

    /** This is the source of albums.js controller */
    exports.actions = {
       'index': function(){},  // This will be mapped to GET http://yourapphost/albums
       'show': function(){},   // GET    http://yourapphost/albums/:id
       'new': function(){},    // GET    http://yourapphost/albums/new
       'create': function(){}, // POST   http://yourapphost/albums
       'edit': function(){},   // GET    http://yourapphost/albums/:id/edit
       'update': function(){}, // PUT    http://yourapphost/albums/:id
       'del': function(){},    // DELETE http://yourapphost/albums/:id
    };



