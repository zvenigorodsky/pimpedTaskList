const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode:"development",
    target:"web",
    devtool:'source-map',
    module:{
        rules:[
            {
                test:/\.(jsx?)$/,
                exclude: /node_modules/,
                use:[
                    {
                        loader:'babel-loader',
                        options:{
                            babelrc:true,
                        },
                    },
                ],
            },
        ],
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'Output management',
            template:path.join(__dirname,'template.html')
        }),
    ],
    output:{
        path:path.resolve(__dirname,'dist'),
        clean:true,
    },
};