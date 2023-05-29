import CssPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import HtmlPlugin from 'html-webpack-plugin'
import JsonMinimizerPlugin from 'json-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

import { join } from 'path'

/**
 * Build mode
 * @type {'development' | 'production'}
 */
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production'

/**
 * Build tool
 * @type {string | undefined}
 */
const devtool = process.env.DEVTOOL

const cwd = process.cwd()
const input = 'src'
const output = 'dist'

/**
 * @type {import('webpack').Configuration}
 */
export default {
  entry: {
    index: join(cwd, input, 'view/index/index.ts'),
    styles: join(cwd, input, 'styles/index.ts'),
  },
  output: {
    path: join(cwd, output),
  },
  devtool,
  devServer: {},
  resolve: {
    extensions: ['.js', '.ts'],
  },
  mode,
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: 'esbuild-loader',
      },
      {
        test: /\.css/,
        use: [
          CssPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 },
          },
        ],
      },
      {
        test: /\.html/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: mode === 'production',
          },
        },
      },
    ],
  },
  optimization: {
    minimize: mode === 'production',
    minimizer: [new CssMinimizerPlugin(), new JsonMinimizerPlugin(), new TerserPlugin()],
  },
  plugins: [
    new CssPlugin({ filename: 'styles/[name].css' }),
    new HtmlPlugin({
      chunks: ['index', 'styles'],
      filename: 'index.html',
      template: join(cwd, input, 'view/index/index.html'),
    }),
  ],
}
