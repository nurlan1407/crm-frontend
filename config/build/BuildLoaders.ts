import type webpack from 'webpack'
import { type BuildOptions } from './types/BuildOptions'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildLoaders (options: BuildOptions): webpack.RuleSetRule[] {
  // if we use js we need babel
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader'
      // options:{
      //     getCustomTransformers: ()=>({
      //         before:[options.isDev && ReactRefreshTypeScript()].filter(Boolean)
      //     }),
      //     transpileOnly: options.isDev
      // }
    },
    exclude: /node_modules/
  }
  // const styleLoader = {
  //     test: /\.s[ac]ss$/i,
  //     use: [

  //         // Creates `style` nodes from JS strings
  //       options.isDev?"style-loader":MiniCssExtractPlugin.loader,
  //       // Translates CSS into CommonJS
  //       {
  //         loader: "css-loader",
  //         options: {
  //           importLoaders: 1,
  //           modules: true,
  //         },
  //       },
  //       // Compiles Sass to CSS
  //       "sass-loader",
  //     ],
  // }
  const styleLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: (resPath: string) => resPath.includes('.module.'),
            localIdentName: options.isDev ? '[path][name]__[local]' : '[hash:base64:8]'
          }
        }
      },
      // Compiles Sass to CSS
      'sass-loader'
    ]
  }
  const fontloader = {
    test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }
    ]
  }
  const fileloader = {
    test: /\.(png|jpg|gif|jpeg)$/i,
    use: [
      {
        loader: 'file-loader'
      }
    ]
  }
  const svgLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack']
  }
  // const urlLoader= {
  //     test: /\.(png|jpg)$/,
  //     loader: 'url-loader'
  // }
  return [
    typescriptLoader, styleLoader, fileloader, fontloader, svgLoader
  ]
}
