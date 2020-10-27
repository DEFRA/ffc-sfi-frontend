const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pathToGeneratedLayout = '../../views/layouts/layout.njk'

const isDev = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'

console.log(`Running webpack in ${isDev ? 'development' : 'production'} mode`)

module.exports = {
  entry: './app/frontend/src/entry.js',
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
              publicPath: '../'
            }
          },
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
              sassOptions: {
                outputStyle: 'compressed'
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'images/'
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }
      }
    ]
  },
  output: {
    filename: 'js/bundle.[contenthash].js',
    path: path.resolve(__dirname, 'app/frontend/dist'),
    publicPath: '/assets/'
  },
  plugins: [
    new CleanWebpackPlugin({
      // do not delete the layout file as it gets overwritten each build and
      // isn't within outputPath so causes problems with permissions
      cleanAfterEveryBuildPatterns: [`!${pathToGeneratedLayout}`],
      // files were being removed on rebuild, this prevents that and shouldn't
      // cause problems as all files are removed on initial build
      cleanStaleWebpackAssets: false
    }),
    new CopyPlugin({
      patterns: [
        { from: './node_modules/govuk-frontend/govuk/assets/images', to: 'images/' }
      ]
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: pathToGeneratedLayout,
      template: 'app/views/layouts/_layout.njk'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/application.[contenthash].css'
    })
  ]
}
