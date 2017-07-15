const webpack = require( 'webpack' );
const webpackMerge = require( 'webpack-merge' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

const commonConfig = require( './webpack.common.js' );
const helpers = require( './helpers' );
const path = require( 'path' );


const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
/**
 * In order to set API url for development run in the console:
 * npm run develop --apiurl=http://someipaddress:port
 */
const API_URL = ( process.env.npm_config_apiurl ) || 'http://localhost:8080';

module.exports = webpackMerge( commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root( 'prod' ),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin( { // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    } ),
    new ExtractTextPlugin( '[name].[hash].css' ),
    new webpack.DefinePlugin( {
      'process.env': {
        'ENV': JSON.stringify( ENV ),
        'API_URL': JSON.stringify( API_URL )
      }
    } ),
    new webpack.LoaderOptionsPlugin( {
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    } ),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve( __dirname, '../src' )
    ),
    new BundleAnalyzerPlugin()
  ]
} );
