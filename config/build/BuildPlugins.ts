import webpack from 'webpack'
import { type BuildOptions } from './types/BuildOptions'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export const buildPlugins = (buildOptions: BuildOptions): webpack.WebpackPluginInstance[] => {
  return [
    new HtmlWebpackPlugin({ template: buildOptions.paths.html }),
    new MiniCssExtractPlugin(
      {
        filename: buildOptions.isDev ? '[name].css' : '[name].[hash].css',
        chunkFilename: buildOptions.isDev ? '[id].css' : '[id].[hash].css'
      }
    ),
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
  ]
}
