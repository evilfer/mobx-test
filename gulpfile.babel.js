/*
 * @title gulpfile.babel.js
 * @description A directory file loader to include all the gulp tasks
 */

/*********************************************************************************
 1. IMPORTS
 *********************************************************************************/

import gulp from 'gulp';
import webpack from 'webpack';
import path from 'path';
import gutil from 'gulp-util';

const paths = {
    src: 'src',
    dev: 'build/dev',
    prod: 'build/prod'
};


const jsPath = {
    src: paths.src,
    dev: paths.dev + '/js',
    prod: paths.prod + '/js'
};

// JS WebPack Task Generator
let jsWebpackTaskGen = function (mode) {
    let isProd = mode === 'prod',
        doWatch = mode === 'watch',
        output = jsPath[isProd ? 'prod' : 'dev'],
        plugins = isProd ?
            [
                new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
                new webpack.optimize.UglifyJsPlugin({output: {comments: false}, sourceMap: false})
            ] :
            [
                new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('development')}}),
            ];

    return () => {
        // run webpack
        return webpack({
            entry: {
                'index': './src/index.js'
            },
            watch: doWatch,
            plugins: plugins,
            output: {
                path: path.join(__dirname, output),
                filename: '[name].js'
            },
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        presets: [
                            'react',
                            'es2015',
                            'stage-1'
                        ],
                        plugins: [
                            'transform-decorators-legacy',
                            'transform-class-properties'
                        ]
                    }
                }, {
                    test: /\.json$/,
                    loader: 'json-loader'
                }]
            },
            devtool: !isProd && '#inline-source-map'
        }, function (err, stats) {
            if (err) throw new gutil.PluginError('webpack', err);
            gutil.log('[webpack]', stats.toString({chunks: false}));
        });
    };
};


gulp.task('js-wp-dev', jsWebpackTaskGen('dev'));
gulp.task('js-wp-prod', jsWebpackTaskGen('prod'));
gulp.task('js-wp-watch', jsWebpackTaskGen('watch'));
