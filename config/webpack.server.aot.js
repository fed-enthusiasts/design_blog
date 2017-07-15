const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
const AotPlugin = require( '@ngtools/webpack' ).AotPlugin;
const BundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

const helpers = require( './helpers' );
const path = require( 'path' );


const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
/**
 * In order to set API url for development run in the console:
 * npm run develop --apiurl=http://someipaddress:port
 */
const API_URL = ( process.env.npm_config_apiurl ) || 'http://localhost:8080';

const SSR = true;

module.exports = {
    devtool: 'source-map',
    entry: {
        'app': './src/main-server-aot.ts'
    },
    output: {
        path: helpers.root( 'serverSide' ),
        publicPath: '/',
        filename: 'server.js'
    },
    target: "node",
    node: {
        global: true,
        __dirname: false,
        __filename: true,
        process: true,
        Buffer: true
    },
    resolve: {
        extensions: [ '.ts', '.js', '.scss', '.html', "css" ]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node-modules/,
                use: '@ngtools/webpack'
            },
            {
                test: /\.html$/,
                exclude: /node-modules/,
                use: 'html-loader'
            },
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                exclude: /node_modules/,
                use: 'file-loader?name=client/assets/fonts/[name].[hash].[ext]'
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/,
                exclude: /node_modules/,
                use: 'file-loader?name=client/assets/images/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new AotPlugin( {
            tsConfigPath: './src/tsconfig-server-aot.json',
            entryModule: helpers.root( 'src/app/app.server.module#AppServerModule' )
        } ),
        new webpack.DefinePlugin( {
            'process.env': {
                'ENV': JSON.stringify( ENV ),
                'API_URL': JSON.stringify( API_URL ),
                'SSR': JSON.stringify( SSR ),
            }
        } ),
      /*  new BundleAnalyzerPlugin()*/
    ]
};
