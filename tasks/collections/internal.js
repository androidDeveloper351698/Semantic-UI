/*******************************
    Internal Task Collection
*******************************/

/* These tasks create packaged files from **dist** components
   Not intended to be called directly by a user because
   these do not build fresh from **src**
*/

module.exports = function(gulp) {

  var
    // node dependencies
    fs        = require('fs'),
    chmod     = require('gulp-chmod'),
    concat    = require('gulp-concat'),
    concatCSS = require('gulp-concat-css'),
    clone     = require('gulp-clone'),
    gulpif    = require('gulp-if'),
    header    = require('gulp-header'),
    less      = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),
    plumber   = require('gulp-plumber'),
    print     = require('gulp-print'),
    rename    = require('gulp-rename'),
    replace   = require('gulp-replace'),
    uglify    = require('gulp-uglify'),

    // user config
    config    = require('./../config/user'),

    // install config
    tasks     = require('./../config/project/tasks'),
    release   = require('./../config/project/release'),

    // shorthand
    globs     = config.globs,
    assets    = config.paths.assets,
    output    = config.paths.output,
    source    = config.paths.source,

    banner    = tasks.banner,
    filenames = tasks.filenames,
    log       = tasks.log,
    settings  = tasks.settings
  ;

  /*--------------
      Packaged
  ---------------*/

  gulp.task('package uncompressed css', function() {
    return gulp.src(output.uncompressed + '**/' + globs.components + globs.ignored + '.css')
      .pipe(plumber())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concatCSS(filenames.concatenatedCSS))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(gulp.dest(output.packaged))
        .pipe(print(log.created))
    ;
  });

  gulp.task('package compressed css', function() {
    return gulp.src(output.uncompressed + '**/' + globs.components + globs.ignored + '.css')
      .pipe(plumber())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concatCSS(filenames.concatenatedMinifiedCSS))
        .pipe(minifyCSS(settings.minify))
        .pipe(header(banner, settings.header))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(gulp.dest(output.packaged))
        .pipe(print(log.created))
    ;
  });

  gulp.task('package uncompressed js', function() {
    return gulp.src(output.uncompressed + '**/' + globs.components + globs.ignored + '.js')
      .pipe(plumber())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concat(filenames.concatenatedJS))
        .pipe(header(banner, settings.header))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(gulp.dest(output.packaged))
        .pipe(print(log.created))
    ;
  });

  gulp.task('package compressed js', function() {
    return gulp.src(output.uncompressed + '**/' + globs.components + globs.ignored + '.js')
      .pipe(plumber())
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concat(filenames.concatenatedMinifiedJS))
        .pipe(uglify(settings.uglify))
        .pipe(header(banner, settings.header))
        .pipe(gulpif(config.hasPermission, chmod(config.permission)))
        .pipe(gulp.dest(output.packaged))
        .pipe(print(log.created))
    ;
  });

  /*--------------
        RTL
  ---------------*/

  gulp.task('package uncompressed rtl css', function () {
    return gulp.src(output.uncompressed + '**/' + globs.components + globs.ignoredRTL + '.rtl.css')
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concatCSS(filenames.concatenatedRTLCSS))
        .pipe(gulp.dest(output.packaged))
        .pipe(print(log.created))
    ;
  });

  gulp.task('package compressed rtl css', function () {
    return gulp.src(output.uncompressed + '**/' + globs.components + globs.ignoredRTL + '.rtl.css')
      .pipe(replace(assets.uncompressed, assets.packaged))
      .pipe(concatCSS(filenames.concatenatedMinifiedRTLCSS))
        .pipe(minifyCSS(settings.minify))
        .pipe(header(banner, settings.header))
        .pipe(gulp.dest(output.packaged))
        .pipe(print(log.created))
    ;
  });

};