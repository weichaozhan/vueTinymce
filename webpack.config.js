const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: './demo/main.js',
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.(js)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /(node_modules|bower_components)/, //屏蔽不需要处理的文件（文件夹）（可选）
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            // 'es2015',
                            // 'stage-3',
                        ],
                        plugins: [
                            'transform-es2015-modules-umd'
                        ]
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {test: /\.css$/, use:['vue-style-loader', 'style-loader','css-loader',]},
            {test: /\.less$/, use:['vue-style-loader', 'style-loader','css-loader','less-loader',]},
            {
                test: /\.(png|svg|jpg|gif)$/, use: ['url-loader?name=assets/images/[name][hash].[ext]']
            },
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
            {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new copyWebpackPlugin([
            { from: './static', to: './' },
        ]),
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './[name][hash].js'
    }
};

if (process.env.NODE_ENV === 'production') {
    config.entry = './src/index.js',
    config.output = {
        path: path.resolve(__dirname, 'dist'),
        filename: './vue-tinymce.js',
        libraryTarget:'umd',   // 输出的文件格式,umd可适用各种规范(cmd/amd/commonjs...)
        library:'VueTinymce'  // 输出的文件库的名字
    }
    config.plugins = config.plugins.concat([
        new CleanWebpackPlugin(['dist']),
    ]);
} else if (process.env.NODE_ENV === 'development') {
    config.plugins = config.plugins.concat([
        new HtmlWebpackPlugin({
            title: 'VueTinymce',
            template: 'index.html'
        }),
    ]);
}

module.exports = config;