const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = {
    entry: './src/main.js',
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(js)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /(node_modules|bower_components)/, //屏蔽不需要处理的文件（文件夹）（可选）
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {test: /\.css$/, use:['vue-style-loader', 'style-loader','css-loader',]},
            {test: /\.less$/, use:['vue-style-loader', 'style-loader','css-loader','less-loader',]},
            {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'VueTinymce',
            template: 'index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './[name][hash].js'
    }
};

if (process.env.NODE_ENV === 'production') {
    config.plugins = config.plugins.concat([
        new CleanWebpackPlugin(['dist']),
    ]);
}

console.log('config.plugins', config.plugins)

module.exports = config;