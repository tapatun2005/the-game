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
    var json = require('gulp-json-wrapper');
    var gzip = require('gulp-gzip');


var csvFiles = {
  main_cards: 'src/data/888poker - main_cards.csv',
  hands: 'src/data/888poker - hands.csv',
  games: 'src/data/888poker - games.csv',
  intros: 'src/data/888poker - game_intro.csv',
  stages: 'src/data/888poker - game_stages.csv',
  steps: 'src/data/888poker - stage_steps.csv',
  tips: 'src/data/888poker - game_tips.csv',
  languages: 'src/data/888poker - languages.csv'
}

var csvData = [];

gulp.task('default', ['compile', 'watch', 'server', 'json']);
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
    // .pipe(json({
    //   src: 'json/888poker - hands.json',
    //   namespace: 'hands'
    // }))
    // .pipe(json({
    //   src: 'json/888poker - main_cards.json',
    //   namespace: 'main_cards'
    // }))
    // .pipe(json({
    //   src: 'json/888poker - game_1.json',
    //   namespace: 'game_1'
    // }))
    // .pipe(json({
    //   src: 'json/888poker - game_2.json',
    //   namespace: 'game_2'
    // }))
    // .pipe(json({
    //   src: 'json/888poker - game_3.json',
    //   namespace: 'game_3'
    // }))
    // .pipe(json({
    //   src: 'json/888poker - game_4.json',
    //   namespace: 'game_4'
    // }))
    // .pipe(json({
    //    src: 'json/888poker - game_5.json',
    //    namespace: 'game_5'
    //}))
    // .pipe(json({
    //   src: 'json/888poker - chips_1.json',
    //   namespace: 'chips_1'
    // }))
    // .pipe(json({
    //   src: 'json/888poker - chips_2.json',
    //   namespace: 'chips_2'
    // }))
    //   .pipe(json({
    //     src: 'json/888poker - chips_3.json',
    //     namespace: 'chips_3'
    // }))
    // .pipe(json({
    //   src: 'json/888poker - chips_4.json',
    //   namespace: 'chips_4'
    // }))
    //   .pipe(json({
    //     src: 'json/888poker - chips_5.json',
    //     namespace: 'chips_5'
    // }))
    //    .pipe(json({
    //     src: 'json/888pokerdata - tableCards.json',
    //     namespace: 'tableCards'
    // }))
    
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
    .pipe(gulp.dest('build/js'))

    .pipe(gzip())
    .pipe(gulp.dest('production/js'));
});

gulp.task('markup', function () {

  for (var i in csvFiles) {
      var raw = fs.readFileSync(csvFiles[i], "utf8").trim();
      csvData[i] = baby.parse(raw, { header: true }).data;
  }


  for (var i in csvData.games) {
    csvData.games[i].index = parseInt(i);
    csvData.games[i].displayNum = parseInt(i)+1;
    
//intros
    intros = grep(csvData.intros, function(e) {
      return (e.game_id === csvData.games[i].title);
    });
    csvData.games[i].intros = intros.map(function(a) {
      a.description = marked(a.description);
      return a;
    });

//stages
    stages = grep(csvData.stages, function(e) {
        return (e.game_id === csvData.games[i].title);
    });
    csvData.games[i].stages = stages.map(function(a) {
      a.intro = marked(a.intro);
      return a;
    });

//tips
   tips = grep(csvData.tips, function(e) {
        return (e.game_id === csvData.games[i].title);
    });
    csvData.games[i].tips = tips.map(function(a) {
      a.description = marked(a.description);
      return a;
    });
  }

  for (var i in csvData.stages) {
    csvData.stages[i].index = parseInt(i);
    csvData.stages[i].displayNum = parseInt(i)+1;
    steps = grep(csvData.steps, function(e) {
        return (e.stage_id === csvData.stages[i].stage_id);
    });
    csvData.stages[i].steps = steps.map(function(a) {
      a.description = marked(a.description);
      return a;
    });
  }

//hands
  for (var i in csvData.hands) {
    csvData.hands[i].description = marked(csvData.hands[i].description);
  }



  return gulp.src('src/templates/*.jade')
    .pipe(data( function() {
      return csvData;
    }))
    .pipe(jade())
    .pipe(gulp.dest('build'))
    .pipe(gzip())
    .pipe(gulp.dest('production'));
});

gulp.task('styles', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(autoprefixer({
      includePaths: ['src/scss/'],
      browsers: ['last 10 versions'],
      cascade: false
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin({
      processImportFrom: ['!fonts.googleapis.com']
    }))
    .pipe(gulp.dest('build/css'))

    .pipe(gzip())
    .pipe(gulp.dest('production/css'));
});

gulp.task('assets', function () {
  return gulp.src('src/images/**/*')
    //.pipe(imagemin())
    .pipe(gulp.dest('build/images'))
    
    .pipe(gulp.dest('production/images'));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*.*')
      .pipe(gulp.dest('build/fonts'))
      .pipe(gulp.dest('production/fonts'));
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
