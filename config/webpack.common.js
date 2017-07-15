const webpack = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

const helpers = require( './helpers' );

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: [ '.ts', '.js', '.scss', '.html' ]
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root( 'src', 'tsconfig.json' ) }
          }, 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        exclude: /node-modules/,
        use: 'html-loader'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        exclude: /node_modules/,
        use: 'file-loader?name=assets/fonts/[name].[hash].[ext]'
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        exclude: /node_modules/,
        use: 'file-loader?name=assets/images/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        exclude: helpers.root( 'src', 'app' ),
        use: ExtractTextPlugin.extract( { fallback: 'style-loader', use: [ 'css-loader?sourceMap', 'postcss-loader', 'sass-loader' ] } )
      },
      {
        test: /\.scss$/,
        include: helpers.root( 'src', 'app' ),
        loaders: [ 'raw-loader', 'postcss-loader', 'sass-loader' ]
      }
    ]
  },

  plugins: [
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
    } )
  ]
};
