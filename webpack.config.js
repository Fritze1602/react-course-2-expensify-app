const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  return {
      mode: 'development',
      entry: './src/app.js',
      output: {
          path: path.join(__dirname, 'public', 'dist'),
          filename: 'bundle.js'
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'styles.css',
        }),
      ],
      module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',    
            },
            {
              test: /\.s?css$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: (resourcePath, context) => {
                      return path.relative(path.dirname(resourcePath), context) + '/';
                    },
                  },
                },
               {
                 loader: 'css-loader',
                  options: {
                    sourceMap: true,
                  }
                }, 
                {
                  loader: 'sass-loader',
                   options: {
                     sourceMap: true,
                   }
                 },
              ],
            },
          ]
        },
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
          contentBase: path.join(__dirname, 'public'),
          historyApiFallback: true,
          publicPath: '/dist/'
        },
  }
}
