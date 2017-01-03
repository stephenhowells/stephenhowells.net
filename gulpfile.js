const gulp        = require('gulp')
const browserSync = require('browser-sync')
const sass        = require('gulp-sass')
const prefix      = require('gulp-autoprefixer')
const minifycss   = require('gulp-minify-css')
const rename      = require('gulp-rename')
const cp          = require('child_process')
const scsslint    = require('gulp-scss-lint')
const imagemin    = require('gulp-imagemin')
const pngquant    = require('imagemin-pngquant')
const ngrok       = require('ngrok')
const psi         = require('psi')
const sequence    = require('run-sequence')
const exit        = require('gulp-exit')
const portVal     = 3020
let site          = ''


var messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
}

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', done => {
  browserSync.notify(messages.jekyllBuild)
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
    .on('close', done)
})

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
  browserSync.reload()
})

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], () => {
  browserSync({
    server: {
      baseDir: '_site'
    },
    notify: false,
    browser: 'google chrome',
    open: false,
  })
})

/**
 * Compile files from _scss into both css and _includes
 */
gulp.task('sass', () => {
  console.log('Running Sass')
  return gulp.src('_scss/main.scss')
    .pipe(sass())
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(minifycss())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('_includes'))
})

/**
 * Lint .scss
 */
gulp.task('scss-lint', () => {
  gulp.src('_scss/**/*.scss')
    .pipe(scsslint({
        'bundleExec': true,
        'config': 'scss-lint-config.yml'
    }))
})

/**
 * Minify Images
 */
gulp.task('imagemin', () => {
  return gulp.src('_img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
  }))
  .pipe(gulp.dest('dist/img'))
})

/**
 * Page Speed Insights
 */
gulp.task('psi-desktop', () => {
  return psi.output(site, {
    nokey: 'true',
    strategy: 'desktop',
    threshold: 50,
  }).then( () => {
    console.log('done')
  })
})

gulp.task('psi-mobile', () => {
  return psi.output(site, {
    nokey: 'true',
    strategy: 'mobile',
    threshold: 50,
  }).then( () => {
    console.log('done')
  })
})

/**
 * ngrok for the url
 */
gulp.task('ngrok-url', cb => {
 return ngrok.connect(portVal, (err, url) => {
  site = url
  console.log('serving your tunnel from: ' + site)
  cb()
 })
})

/**
 * Wait for jekyll-build, then launch the Server with port 3020
 */
gulp.task('browser-sync-psi', ['jekyll-build'], () => {
  browserSync({
    port: portVal,
    open: false,
    server: {
      baseDir: '_site',
    }
  })
})

gulp.task('psi-seq', cb => {
  return sequence(
    'browser-sync-psi',
    'ngrok-url',
    'psi-desktop',
    'psi-mobile',
    cb
  )
})

gulp.task('psi', ['psi-seq'], () => {
  console.log('Woohoo! Check out your page speed scores!')
  process.exit()
})

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 * Minify images too
 */
gulp.task('watch', () => {
  gulp.watch('_scss/**/*.scss', ['sass', 'jekyll-rebuild'])
  gulp.watch(['index.html', '404.md', '_layouts/*.html', '_includes/*.html', '_posts/**/*', 'about/*', 'search/*', '_data/*'], ['jekyll-rebuild'])
  gulp.watch(['_img/*'], ['imagemin', 'jekyll-rebuild'])
})

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch'])
