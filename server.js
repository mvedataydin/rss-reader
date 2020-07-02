//require the Elasticsearch librray
const elasticsearch = require('elasticsearch');
// instantiate an elasticsearch client
const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});
//require Express
const express = require( 'express' );
// instanciate an instance of express and hold the value in a constant called app
const app     = express();
//require the body-parser library. will be used for parsing body requests
const bodyParser = require('body-parser')
//require the path library
const path    = require( 'path' );

// ping the client to be sure Elasticsearch is up
client.ping({
     requestTimeout: 30000,
 }, function(error) {
 // at this point, eastic search is down, please check your Elasticsearch service
     if (error) {
         console.error('elasticsearch cluster is down!');
     } else {
         console.log('Everything is ok');
     }
 });


// use the bodyparser as a middleware  
app.use(bodyParser.json())
// set port for the app to listen on
app.set( 'port', process.env.PORT || 3001 );
// set path to serve static files
app.use( express.static( path.join( __dirname, 'public' )));
// enable CORS 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// defined the base route and return with an HTML file called tempate.html
app.get('/', function(req, res){
  res.sendFile('template.html', {
     root: path.join( __dirname, 'views' )
   });
})
// decare a new route. This route serves a static HTML template called template2.html
app.post('/index', function(req, res){
    client.indices.create({
        index: 'rss-feeds'
    }, function(error, response, status) {
        if (error) {
            console.log(error);
        } else {
            console.log("created a new index", response);
        }
    });
    client.index({
        index: 'rss-feeds',
        id: '1',
        type: 'feed_list',
        body: {
            "Key1": "Content for key one",
            "Key2": "Content for key two",
            "key3": "Content for key three",
        }
    }, function(err, resp, status) {
        console.log(resp);
    });

    var bulk = [];
    //loop through each feed and create and push two objects into the array in each loop
    //first object sends the index and type you will be saving the data as
    //second object is the data you want to index
    req.body.forEach(feedItem =>{
    bulk.push({index:{ 
                    _index:"rss-feeds", 
                    _type:"feed_list",
                }          
            })
    bulk.push(feedItem)
    })


    client.bulk({body:bulk}, function( err, response  ){ 
        if( err ){ 
            console.log("Failed Bulk operation", err) 
        } else { 
            console.log("Successfully imported ", req.body.length); 
        } 
}); 
})
// define the /search route that should return elastic search results 
app.get('/search', function (req, res){
  // declare the query object to search elastic search and return only 200 results from the first result found. 
  // also match any data where the name is like the query string sent in
  let body = {
    size: 200,
    from: 0, 
    query: {
        multi_match : {
          query:    req.query['q'], 
          fields: [ "title", "content" ] 
        }
    }
  }
  // perform the actual search passing in the index, the search query and the type
  client.search({index:'rss-feeds',  body:body, type:'feed_list'})
  .then(results => {
    res.send(results.hits.hits);
  })
  .catch(err=>{
    console.log(err)
    res.send([]);
  });

})
// listen on the specified port
app .listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
} );


