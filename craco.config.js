const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.resolve.fallback = {
        stream: require.resolve('stream-browserify'),
        timers: require.resolve('timers-browserify'),
        // 필요한 다른 폴리필을 추가합니다.
      };

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
      ];

      return webpackConfig;
    },
    babel: {
      plugins: ['@babel/plugin-proposal-private-property-in-object']
    }
  }
};
