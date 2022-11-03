// define preprocessor variables
const opts = {
  DEBUG: true,
  version: 3,
  "ifdef-verbose": true,                 // add this for verbose output
  "ifdef-fill-with-blanks": true         // add this to remove code with blank spaces instead of "//" comments
};

// vue.config.js
module.exports = {
  publicPath: "/" ,
  runtimeCompiler: true,
  filenameHashing: process.env.MODE === 'hash' ? true: false,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    extract: process.env.MODE === 'hash' ? {
      filename: 'webview-library.[hash].css'
    } : process.env.NODE_ENV === 'production' && process.env.MODE !== 'single' ? {
      filename: 'webview-library.css'
    } : false
  },
  lintOnSave: true,
  configureWebpack: {
    output: process.env.MODE === 'hash'
      ? {
        path: __dirname + '/dist',
        filename: 'webview-library.[hash].js'
      } : process.env.NODE_ENV === 'production' ? { 
        path: __dirname + '/dist',
        filename: 'webview-library.js'
      } : {},
    optimization: process.env.MODE === 'single' ? {
      splitChunks: false
    }: {}
  },
  chainWebpack: config => {
    if (process.env.MODE === 'single') {
      config.module
        .rule('images') // -> Default configuration
        .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
        .use('url-loader')
        .loader('url-loader')
        .options({
          limit: 102400,
          fallback: {
            loader: 'file-loader',
            options: { name: 'img/[name].[hash:8].[ext]' },
          },
        })
        .end()
    }
    config.module
    .rule('js')
    .test(/\.m?jsx?$/)
    .exclude.add(function() {
      return [
          'node_modules',
          'src/js/vendors'
      ]})
    .end()
    .use('ifdef-loader')
    .loader('ifdef-loader')
    .options(opts)
    .end()
  },
  pluginOptions: {
    compression:{
      gzip: {
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json|ttf)(\?.*)?$/i,
        minRatio: 1,
      }
    }
  }
}