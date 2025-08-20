const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
let BundleAnalyzerPlugin
try {
  BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
} catch (e) {
  BundleAnalyzerPlugin = null
}

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'styles.[contenthash].css' }), new CleanWebpackPlugin()],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ parallel: true })],
    splitChunks: {
      chunks: 'all'
    }
  }
})

  // add analyzer when requested
  if (process.env.ANALYZE === 'true' && BundleAnalyzerPlugin) {
    module.exports.plugins = module.exports.plugins.concat([
      new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false, reportFilename: 'bundle-report.html' })
    ])
  }
