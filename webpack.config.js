const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');
// var WebpackOnBuildPlugin = require('on-build-webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    devtool: 'source-map',
    mode: 'development',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules: [
            {test: /.ts$/,loader: 'ts-loader'}
        ]
    },
    plugins: [
        new WebpackShellPluginNext({
            onBuildStart: {
                scripts: ['echo Building Start']
            },
            onBuildEnd: {
                scripts: ['echo Build completed now running Server','nodemon dist/index.js --watch dist/**'],
                parallel: true,
            }
        }),
    ],
    externals: nodeModules,
    watch: true,
    watchOptions: {
        ignored: ['node_modules','frontend/**']
    }
}