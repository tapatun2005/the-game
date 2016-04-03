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
    //Converter = require("csvtojson").Converter;
    //converter = new Converter({});
    //var swig = require('gulp-swig');
    //var data = require('gulp-data');
    //var csv2json = require('gulp-csv2json');
    //var rename = require('gulp-rename');
    var convert = require('gulp-convert');
    var concat = require('gulp-concat');
    //var concat_json = require("gulp-concat-json");
    var json = require('gulp-json-wrapper')


var csvFiles = {
  main_cards: 'src/data/888poker - main_cards.csv',
  hands: 'src/data/888poker - hands.csv'
}

var csvData = [];

gulp.task('default', ['compile', 'watch', 'server', 'json']);
gulp.task('compile', ['scripts', 'markup', 'styles', 'assets', 'fonts']);
gulp.task('scripts', ['script-compile']);


//gulp.task('replace', function (){
//  require("fs").createReadStream("src/data/888poker - main_cards.csv").pipe(converter);
//  converter.on("end_parsed", injectJSON);
//});

gulp.task('json', function() {
  gulp.src(['src/data/*.csv'])
    .pipe(convert({
      from: 'csv',
      to: 'json'
    }))
    .pipe(gulp.dest('json/'));
});

gulp.task('two', function() {
  gulp.src('src/js/base.js')
    .pipe(json({
      src: 'json/888poker - hands.json',
      namespace: 'hands'
    }))
    .pipe(json({
      src: 'json/888poker - main_cards.json',
      namespace: 'main_cards'
    }))
  .pipe(concat('base.js'))
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
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/images/**/*.*', ['assets']);
  gulp.watch('src/fonts/**/*.*', ['fonts']);
  gulp.watch('json/**/*.*', ['json']);
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

//function injectJSON(json) {
//  return gulp.src('src/js/base.js')
//    .pipe(replace("['maincards']", JSON.stringify(json)))
//    .pipe(gulp.dest('src/js/'));
//}