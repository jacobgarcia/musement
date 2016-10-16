var webpack = require('webpack'),
    ngAnnotatePlugin = require('ng-annotate-webpack-plugin')

module.exports = {
  output: {
    filename: "bundle.js"
  },
  plugins: [ //Optimize all posible code with this stuff
    webpack plugin that runs ng-annotate on your bundles
    new ngAnnotatePlugin({
        add: true,
        // other ng-annotate options here
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true //Remove warnings, production oriented
      }
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/)
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel', // 'babel-loader' is also a valid name to reference
        query: {
          presets: ["es2015","babel-preset-es2015","angular"]
        }
      }
    ]
  }
}
