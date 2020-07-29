var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var BrowserSyncPlugin = require("browser-sync-webpack-plugin");

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser/')
var phaser = path.join(phaserModule, 'src/phaser.js')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || "true")),
  _ENV: JSON.stringify(process.env.ENV),
  WEBGL_RENDERER: true,
  CANVAS_RENDERER: true
});

module.exports = {
  entry: {
    app: [path.resolve(__dirname, "src/main.tsx")],
  },
  devtool: "cheap-source-map",
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, "dist"),
    publicPath: "./dist/",
    chunkFilename: '[name].chunk.js',
    filename: "bundle.js",
  },
  watch: true,
  optimization: {
    namedModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      }
    },
    runtimeChunk: true
  },
  plugins: [
    definePlugin,
    new HtmlWebpackPlugin({
      filename: "../index.html",
      template: "./src/index.html",
      hash: false
    }),
    new BrowserSyncPlugin({
      host: process.env.IP || "localhost",
      port: process.env.PORT || 3000,
      server: {
        baseDir: ["./", "./build"]
      }
    })
  ],
  module: {
    rules: [
      {
        test: [/\.ts$/, /\.tsx$/],
        loaders: ['babel-loader', 'awesome-typescript-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: "raw-loader"
      },
      {
        test: /\.(graphql|gql)$/,
        use: 'graphql-tag/loader'
      }
    ]
  },
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".gql", ".graphql"],
    alias: {
      react: 'preact/compat',
      'phaser': phaser
    }
  }
};
