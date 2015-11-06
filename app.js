var express = require('express')
  , kudos = require('./routes/kudos')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');
  
var favicon = require('serve-favicon')
  , logger = require('morgan')
  , methodOverride = require('method-override')
  , bodyParser = require('body-parser')
  , multer = require('multer')
  , errorHandler = require('errorhandler');


mongoose.connect(`mongodb://${process.env.IP}/kudos`, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', kudos);

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});