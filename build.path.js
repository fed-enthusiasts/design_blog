const path = require( 'path' );

module.exports = {
    pathDist: path.resolve( __dirname, 'dist' ),
    pathProd: path.resolve( __dirname, 'prod' ),
    pathServer: path.resolve( __dirname, 'serverSide' )
}