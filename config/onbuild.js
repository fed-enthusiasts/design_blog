const filePrefixes = [ 'app', 'vendor', 'polyfills' ];
const buildPaths = require( '../build.path' );
const fs = require( 'fs' );

function checkFiles( hash, dir ) {
    fs.readdir( dir || buildPaths.pathDist, ( err, files ) => {
        files.forEach( file => {
            const parts = file.split( '.' );
            const name = ( dir || buildPaths.pathDist ) + "\\" + file;
            if ( !fs.lstatSync( name ).isDirectory() && parts[ 0 ] && filePrefixes.indexOf( parts[ 0 ] ) >= 0 && parts[ 1 ] && parts[ 1 ] !== hash ) {
                fs.unlink( name, ( err ) => {
                    if ( err ) {
                        throw new Error( err );
                    }
                     console.log( 'DELETED >>>>>>>>>>>>>>>>>> ', name );
                } );
            } else if ( fs.lstatSync( name ).isDirectory() ) {
                checkFiles( hash, name );
            }
        } );
    } );
}



module.exports = function onbuild( stats ) {
   /*  console.dir( Object.keys( stats.compilation ) );
    console.dir( stats.compilation.hash ); */
    checkFiles( stats.compilation.hash );

};