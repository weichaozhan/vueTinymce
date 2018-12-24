const config = require('./webpack.config.js');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
    contentBase: path.join(__dirname, 'dist'),
});
server.listen(3002);