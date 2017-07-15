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

module.exports = {
    devtool: 'source-map',
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor-aot.ts',
        'app': './src/main-aot.ts'
    },
    output: {
        path: helpers.root( 'dist' ),
        publicPath: '/',
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    resolve: {
        extensions: [ '.ts', '.js', '.scss', '.html' ]
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
                test: /\.scss$/,
                exclude: helpers.root( 'src', 'app' ),
                use: ExtractTextPlugin.extract( {
                    fallback: 'style-loader',
                    use: [ 'css-loader?sourceMap', 'postcss-loader', 'sass-loader' ]
                } )
            },
            {
                test: /\.scss$/,
                include: helpers.root( 'src', 'app' ),
                loaders: [ 'raw-loader', 'postcss-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new AotPlugin( {
            tsConfigPath: './src/tsconfig-aot.json',
            entryModule: helpers.root( 'src/app/app.module#AppModule' )
        } ),
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root( './src' ), // location of your src
            {} // a map of your routes
        ),

        new webpack.optimize.CommonsChunkPlugin( {
            name: [ 'app', 'vendor', 'polyfills' ]
        } ),

        new HtmlWebpackPlugin( {
            template: 'src/index.html',
            chunksSortMode: 'dependency',
            favicon: './favicon.ico'
        } ),
        new webpack.NoEmitOnErrorsPlugin(),

        new webpack.optimize.UglifyJsPlugin( { // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        } ),
        new ExtractTextPlugin( 'client/styles/[name].[hash].css' ),

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
      /*  new BundleAnalyzerPlugin()*/
    ]
};
