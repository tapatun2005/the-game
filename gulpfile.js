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
    marked = require('marked');

var csvFiles = {
  categories: 'src/data/Paradise Moment - categories.csv',
  mobile: 'src/data/Paradise Moment - mobile.csv',
  camera: 'src/data/Paradise Moment - camera.csv',
  shoot: 'src/data/Paradise Moment - shoot.csv',
  bios: 'src/data/Paradise Moment - bios.csv',
  terms: 'src/data/Paradise Moment - terms.csv',
  items: 'src/data/Paradise Moment - term_items.csv'
}

var csvData = [];
var mobile = [];
var camera = [];
var shoot = [];
var bios = [];
var terms = [];
var items = [];

gulp.task('default', ['compile', 'watch', 'server']);
gulp.task('compile', ['scripts', 'markup', 'styles', 'assets', 'fonts']);
gulp.task('scripts', ['script-compile']);


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
  
  for (var i in csvData.categories) {
    csvData.categories[i].index = parseInt(i);
    csvData.categories[i].displayNum = parseInt(i)+1;
    
    mobile = grep(csvData.mobile, function(e) {
      return (e.category === csvData.categories[i].category);
    });
    csvData.categories[i].mobile = mobile.map(function(a) {return a});

    camera = grep(csvData.camera, function(e) {
      return (e.category === csvData.categories[i].category);
    });
    csvData.categories[i].camera = camera.map(function(a) {return a});

    shoot = grep(csvData.shoot, function(e) {
      return (e.category === csvData.categories[i].category);
    });
    csvData.categories[i].shoot = shoot.map(function(a) {return a});

    bio = grep(csvData.bios, function(e) {
      return (e.category === csvData.categories[i].category);
    });
    csvData.categories[i].bio = bio.map(function(a) {return a});
  }

  for (var i in csvData.terms) {
    csvData.terms[i].index = parseInt(i);
    csvData.terms[i].displayNum = parseInt(i)+1;
    
    csvData.terms[i].description = marked(csvData.terms[i].description);


    items = grep(csvData.items, function(e) {
      return (e.term_id === csvData.terms[i].title);
    });
    csvData.terms[i].items = items.map(function(a) {
      a.item = marked(a.item);
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
  return gulp.src('src/images/*')
    .pipe(imagemin())
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