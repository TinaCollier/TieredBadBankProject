// server/index.js

const express = require( "express" );
const bodyParser = require( 'body-parser' );
path = require( 'path' );

const cors = require( 'cors' );


let PORT = process.env.PORT;
if (PORT == null || PORT == "") {
  PORT = 8000;
}

const app = express();
app.use( cors() );

const dal = require( './dal' );

const parser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
app.use( parser );
app.use( jsonParser );

// Have Node serve the files for our built React app
app.use( express.static( path.resolve( __dirname, "../public/build" ) ) );

// Handle GET requests to /api route
app.get( "/api", ( req, res ) => {
    res.json({ message: "Hello from server!" });
  } );

// create user account
app.post( '/user/create', jsonParser, async ( req, res ) => {
  await dal.create( req.body.name, req.body.email, req.body.password ).then( ( user ) => {
      res.send( user );
    } );
} );

// find user account
app.post( '/user/search', jsonParser, async ( req, res ) => {
  const email = req.body.email;
  const results = await dal.findOne( email )
  console.log( 'results', results );
  res.send( results );

} );

app.get( '/user/:email', jsonParser, async ( req, res ) => {
  const email = req.params.email;
  await dal.findById( email ).then( ( user ) => {
    res.send( user );
  } );
} );

// update - deposit/withdraw amount
app.put( '/updatebalance', parser, async ( req, res ) => {
  const email = req.body.email;
  const amount = req.body.amount;
  await dal.update( email, amount ).then( ( amount )  => {
    res.send( amount );
  }).catch( error => res.send( error.message ));
} );

// all accounts
app.get( '/alldata', parser, async ( req, res ) => {
  var data = [];
  try {
    data = await dal.all().then( ( data ) => {
      res.send( data ); 
    })} catch (err) {
      res.send( { 'error': 111111 });
      throw err;
    }
})

// delete account
app.delete( '/remove/:email', async ( req, res ) => {
  const email = req.params.email;
  await dal.remove( email ).then( () => {
    res.status( 200 ).json({ message: 'Deleted!' });
  }).catch( ( err ) => {
    res.status( 400 ).json({ error: err })
  })

})

app.listen(PORT, () => {
  console.log( `Server listening on ${ PORT }` );
});