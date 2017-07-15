var webpack = require( 'webpack' );
var webpackMerge = require( 'webpack-merge' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var commonConfig = require( './webpack.common.js' );
var helpers = require( './helpers' );
var path = require( 'path' );
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';
/**
 * In order to set API url for development run in the console:
 * npm run develop --apiurl=http://someipaddress:port
 */
const API_URL = ( process.env.npm_config_apiurl ) || 'http://localhost:8080';


module.exports = webpackMerge( commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root( 'dist' ),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin( '[name].css' ),
    new webpack.DefinePlugin( {
      'process.env': {
        'ENV': JSON.stringify( ENV ),
        'API_URL': JSON.stringify( API_URL )
      }
    } ),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      path.resolve( __dirname, '../src' )
    ),
          new BundleAnalyzerPlugin()
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
} );
