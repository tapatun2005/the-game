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
    var rename = require("gulp-rename");
    var connect = require('gulp-connect-php');


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

gulp.task('default', ['compile', 'watch', 'server', 'json', "connect"]);
gulp.task('compile', ['scripts', 'markup', 'styles', 'assets', 'fonts', 'sounds']);
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
    //   src: 'json/888poker - game_5.json',
    //   namespace: 'game_5'
    // }))
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
  
  for (var i in csvData.languages) {
    var lang = csvData.languages[i].lang_code;

    var scripts = gulp.src("src/js/*.js")
      .pipe(concat('scripts.js'))
      .pipe(rename('scripts.min.js'))
      .pipe(uglify());
    
    scripts.pipe(gulp.dest('build/'+ lang+'/js'))

  }

});

gulp.task('markup', function () {

  for (var i in csvFiles) {
      var raw = fs.readFileSync(csvFiles[i], "utf8").trim();
      csvData[i] = baby.parse(raw, { header: true }).data;
  }


  for (var i in csvData.games) {
    csvData.games[i].index = parseInt(i);
    csvData.games[i].displayNum = parseInt(i)+1;

    csvData.games[i].en_play = marked(csvData.games[i].en_play);
    csvData.games[i].de_play = marked(csvData.games[i].de_play);
    csvData.games[i].es_play = marked(csvData.games[i].es_play);
    csvData.games[i].ru_play = marked(csvData.games[i].ru_play);
    
//intros
    intros = grep(csvData.intros, function(e) {
      return (e.game_id === csvData.games[i].title);
    });
    csvData.games[i].intros = intros.map(function(a) {
      a.en_description = marked(a.en_description);
      a.de_description = marked(a.de_description);
      a.es_description = marked(a.es_description);
      a.ru_description = marked(a.ru_description);
      return a;
    });

//stages
    stages = grep(csvData.stages, function(e) {
        return (e.game_id === csvData.games[i].title);
    });
    csvData.games[i].stages = stages.map(function(a) {
      a.en_intro = marked(a.en_intro);
      a.de_intro = marked(a.de_intro);
      a.es_intro = marked(a.es_intro);
      a.ru_intro = marked(a.ru_intro);
      return a;
    });

//tips
   tips = grep(csvData.tips, function(e) {
        return (e.game_id === csvData.games[i].title);
    });
    csvData.games[i].tips = tips.map(function(a) {
      a.en_description = marked(a.en_description);
      a.de_description = marked(a.de_description);
      a.es_description = marked(a.es_description);
      a.ru_description = marked(a.ru_description);
      return a;
    });

  }

  for (var i in csvData.stages) {
    csvData.stages[i].index = parseInt(i);
    csvData.stages[i].displayNum = parseInt(i)+1;
    csvData.stages[i].en_intro = marked(csvData.stages[i].en_intro);
    csvData.stages[i].de_intro = marked(csvData.stages[i].de_intro);
    csvData.stages[i].es_intro = marked(csvData.stages[i].es_intro);
    csvData.stages[i].ru_intro = marked(csvData.stages[i].ru_intro);
    steps = grep(csvData.steps, function(e) {
        return (e.stage_id === csvData.stages[i].stage_id);
    });
    csvData.stages[i].steps = steps.map(function(a) {
      a.en_description = marked(a.en_description);
      a.de_description = marked(a.de_description);
      a.es_description = marked(a.es_description);
      a.ru_description = marked(a.ru_description);
      return a;
    });
  }

//hands
  for (var i in csvData.hands) {
    csvData.hands[i].en_description = marked(csvData.hands[i].en_description);
    csvData.hands[i].es_description = marked(csvData.hands[i].es_description);
    csvData.hands[i].de_description = marked(csvData.hands[i].de_description);
    csvData.hands[i].ru_description = marked(csvData.hands[i].ru_description);
  }

//translations
  
  for (var i in csvData.languages) {
    var lang = csvData.languages[i].lang_code;

    var h = gulp
            .src('src/templates/*.jade')
            .pipe(data({
              rootUrl: csvData.languages[i].link,
              website_url: csvData.languages[i].website_link,
              langCode: lang,
              intro: csvData.languages[i].intro, 
              rules: csvData.languages[i].rules,
              tips_title: csvData.languages[i].tips_title,
              play: csvData.languages[i].play,
              play_now: csvData.languages[i].play_now,
              about_title: csvData.languages[i].about_title,
              close: csvData.languages[i].close,
              about_title_span: csvData.languages[i].about_title_span,
              about_description_1: csvData.languages[i].about_description_1,
              about_description_2: csvData.languages[i].about_description_2,
              loading: csvData.languages[i].loading,
              splash_text: csvData.languages[i].splash_text,
              splash_instruction: csvData.languages[i].splash_instruction,
              start: csvData.languages[i].start,
              next: csvData.languages[i].next,
              share: csvData.languages[i].share,
              back: csvData.languages[i].back,
              next: csvData.languages[i].next,
              read_more: csvData.languages[i].read_more,
              download: csvData.languages[i].download,
              meta_title: csvData.languages[i].meta_title,
              meta_description: csvData.languages[i].meta_description,
              meta_twitter: csvData.languages[i].meta_twitter,
              hands_title: csvData.languages[i].hands_title,
              stage_title: csvData.languages[i].stage_title,
              player: csvData.languages[i].player
            }))
            .pipe(data( function(e) {
              return csvData;
            }))
            .pipe(jade())
            .pipe(rename(function (path) {
                path.extname = ".php"
            }))

    h
      .pipe(gulp.dest('build/'+ lang));


     var htaccess =  gulp
      .src('src/templates/.htaccess')
    
    htaccess.pipe(gulp.dest('build/'+ lang))
  }
    
});

gulp.task('styles', function () {
  for (var i in csvData.languages) {
    var lang = csvData.languages[i].lang_code;
    var h = gulp.src('src/scss/*.scss')
      .pipe(autoprefixer({
        includePaths: ['src/scss/'],
        browsers: ['last 5 versions'],
        cascade: false
      }))
      .pipe(sass().on('error', sass.logError))
      .pipe(cssmin({
        processImportFrom: ['!fonts.googleapis.com']
      }))
    h
      .pipe(gulp.dest('build/'+ lang +'/css'))

      .pipe(gzip())
      .pipe(gulp.dest('production/'+ lang +'css'));
  }
});

gulp.task('assets', function () {

  for (var i in csvData.languages) {
    var lang = csvData.languages[i].lang_code;
    var h = gulp.src('src/images/**/*');
            //.pipe(imagemin())
    h
      .pipe(gulp.dest('build/'+lang+'/images'))
  }
});

gulp.task('fonts', function() {
  for (var i in csvData.languages) {
    var lang = csvData.languages[i].lang_code;
    var h = gulp.src('src/fonts/**/*.*')
    h
      .pipe(gulp.dest('build/'+lang+'/fonts'))
  }
});

gulp.task('sounds', function() {
  for (var i in csvData.languages) {
    var lang = csvData.languages[i].lang_code;
    var h = gulp.src('src/sounds/**/*.*')
    h
      .pipe(gulp.dest('build/'+lang+'/sounds'))
  }
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/templates/**/*.*', ['markup']);
  gulp.watch('src/data/*', ['markup']);
  gulp.watch('src/scss/**/*.scss', ['styles']);
  gulp.watch('src/images/**/*.*', ['assets']);
  gulp.watch('src/fonts/**/*.*', ['fonts']);
  gulp.watch('src/sounds/**/*.*', ['sounds']);
});

gulp.task('connect', function() {
    connect.server();
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
