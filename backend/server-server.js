const express = require( 'express' );
const app = express();
const port = 3000;
const buildPath = require( './../build.path' ).pathServer;

app.use( express.static( buildPath ) );

/*app.use(( req, res, next ) => {
    res.header( "Access-Control-Allow-Origin", "*" );
    res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    next();
} );*/

app.listen( port );

