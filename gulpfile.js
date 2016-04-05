var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('browserify'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    source = require('vinyl-source-stream'),
    jade = require('gulp-jade'),
    streamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    debowerify = require('debowerify'),
    data = require('gulp-data'),
    baby = require('babyparse'),
    fs = require("fs"),
    marked = require('marked'),
    replace = require('gulp-replace');
    var convert = require('gulp-convert');
    var concat = require('gulp-concat');
    var json = require('gulp-json-wrapper')


var csvFiles = {
  main_cards: 'src/data/888poker - main_cards.csv',
  hands: 'src/data/888poker - hands.csv',
  games: 'src/data/888poker - games.csv',
  intros: 'src/data/888poker - games_intro.csv'
}

var csvData = [];

gulp.task('default', ['compile', 'watch', 'server']);
gulp.task('compile', ['scripts', 'markup', 'styles', 'assets', 'fonts']);
gulp.task('scripts', ['script-compile']);


gulp.task('json', function() {
  gulp.src(['src/data/*.csv'])
    .pipe(convert({
      from: 'csv',
      to: 'json'
    }))
    .pipe(gulp.dest('json/'));

  gulp.src('src/js/data.js')
    .pipe(json({
      src: 'json/888poker - hands.json',
      namespace: 'hands'
    }))
    .pipe(json({
      src: 'json/888poker - main_cards.json',
      namespace: 'main_cards'
    }))
  .pipe(concat('data.js'))
  .pipe(gulp.dest('src/js'));
});

gulp.task('script-hints', function () {
  return gulp.src(['src/js/*.js', '!src/js/*_spec.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .on('error', function () {
      console.warn('Error: JSHint encountered an error');
    });
});

gulp.task('script-compile', ['script-hints'], function () {
  var bundleStream = browserify('./src/js/base.js').bundle();
  
  bundleStream
    .pipe(source('bundle.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('build/js'));
});

gulp.task('markup', function () {

  for (var i in csvFiles) {
      var raw = fs.readFileSync(csvFiles[i], "utf8").trim();
      csvData[i] = baby.parse(raw, { header: true }).data;
  }


  for (var i in csvData.games) {
    csvData.games[i].index = parseInt(i);
    csvData.games[i].displayNum = parseInt(i)+1;
    intros = grep(csvData.intros, function(e) {
      return (e.game_id === csvData.games[i].title);
    });
    csvData.games[i].intros = intros.map(function(a) {
      a.description = marked(a.description);
      return a;
    });
  }



  return gulp.src('src/templates/*.jade')
    .pipe(data( function() {
      return csvData;
    }))
    .pipe(jade())
    .pipe(gulp.dest('build'));
});

gulp.task('styles', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(autoprefixer({
      includePaths: ['src/scss/'],
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin({
      processImportFrom: ['!fonts.googleapis.com']
    }))
    .pipe(gulp.dest('build/css'));
});

gulp.task('assets', function () {
  return gulp.src('src/images/**/*')
    //.pipe(imagemin())
    .pipe(gulp.dest('build/images'));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*.*')
      .pipe(gulp.dest('build/fonts'))
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/templates/**/*.*', ['markup']);
  // gulp.watch('src/data/**/*.*', ['markup']);
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/images/**/*.*', ['assets']);
  gulp.watch('src/fonts/**/*.*', ['fonts']);
  // gulp.watch('json/**/*.*', ['json']);
});

gulp.task('server', ['compile'], function () {
  return browserSync.init(['build/js/*.js', 'build/css/*.css', 'build/index.html'], {
    server: {
      baseDir: './build'
    }
  });
});

var grep = function(items, callback) {
  var filtered = [],
  len = items.length,
  i = 0;
  for (i; i < len; i++) {
    var item = items[i];
    var cond = callback(item);
    if (cond) {
      filtered.push(item);
    }
  }
  return filtered;
};
