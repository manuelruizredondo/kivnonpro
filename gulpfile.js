const {
    src,
    series,
    watch,
    dest
} = require('gulp');
var gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');
const inject = require('gulp-inject');
const browserSync = require('browser-sync').create();


const rename = require('gulp-rename');
const reload = browserSync.reload;

// Compilamos los estilos
function style() {
    console.log('Compilamos estilos...');

    return (
        src('./scss/style.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('./dist'))
    );




}

function styleg() {
    console.log('Compilamos estilos...');

    return (
        src('./scss/**/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('./dist'))
    );




}

/************************** */
/* COPIAMOS DE DIST A BUILD*/
/*  
              __    
             /  |   
             `| |   
              | |   
             _| |_  
            |_____|
        
*/


// Copiamos  ASSETS de dist a build
function copyAssets() {
    console.log('Copying assets...');
    return (
        src('./assets/**/*')
        .pipe(dest('./build/assets'))
    );
}
// Copiamos HTML de dist a build
function copyTemplates() {
    console.log('Copying templates...');
    return (
        src('./src/*.html')
        .pipe(dest('./build'))
    );
}
// Copiamos CSS de dist a build
function copyStyles() {
    console.log('Copying styles...');
    return (
        src('./dist/*.css')
        .pipe(dest('./build/css'))
    );
}

/************* INJECT
           _____   
          / ___ `. 
         |_/___) | 
         .'____.' 
        / /_____  
        |_______| 
         
*/



// Task for inject assets to templates
function injectAssets() {
    console.log('Injecting assets to templates...');

    var target = src('./build/*.html');
    var sources = src(['./build/css/**/*.css'], {
        read: false
    });

    return target.pipe(inject(sources, {
            relative: true
        }))
        .pipe(dest('./build'));
}

// Task for launch a server for development purposes
function buildServer() {
    console.log('Launching BUILDING server...');

    browserSync.init({
        server: {
            baseDir: './build/',
            index: 'index.html'
        }
    });

    // Watch tasks
    watch("./scss/**/*.scss", series('style', 'copyStyles')).on('change', browserSync.reload);
    watch('./src/**/*.html', series('copyTemplates', 'injectAssets')).on('change', browserSync.reload)
}


/************* WATCH
               ______   
             / ____ `. 
             `'  __) | 
             _  |__ '. 
            | \____) | 
            \______.' 
                    

 *********** */



function copyTemplatesWatch() {
    console.log('Copying templates...');

    return (
        src('./src/*.html')
        .pipe(dest('./dist'))
    );
}


// Task for inject assets to templates

function styleWatch() {
    return (
        src('./scss/**/*.scss')
        .pipe(sass())
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream())
    );
}



function injectAssetsWatch() {
    console.log('Injecting assets to templates...');

    var target = src('./dist/*.html');
    var sources = src(['./dist/css/**/*.css'], {
        read: false
    });

    return target.pipe(inject(sources, {
            relative: true
        }))
        .pipe(dest('./dist'));
}




function devServer() {
    console.log('Launching development server...');
    browserSync.init({
        server: {
            baseDir: './build/',
        }
    });

    watch('./scss/**/*.scss'), styleWatch;

    watch('./src/**/*.html', series('copyTemplatesWatch', 'injectAssetsWatch')).on('change', browserSync.reload)
}

/********* WATCH PROPIO *********** */


function styleg() {
    //donde esta mi scss 
    return gulp.src('./scss/**/*.scss')
        //pasamos el archivo y lo compilamos
        .pipe(sass())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
}

function guide() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    gulp.watch('./scss/**/*.scss', styleg)
    gulp.watch('./src/**/*.html').on('change', browserSync.reload);
}


exports.guide = guide;
exports.styleg = styleg;


/********* WATCH PROPIO *********** */

// Work tasks


exports.styleWatch = styleWatch;
exports.style = style;
exports.copyTemplates = copyTemplates;
exports.copyTemplatesWatch = copyTemplatesWatch;
exports.copyAssets = copyAssets;
exports.copyStyles = copyStyles;
exports.injectAssets = injectAssets;
exports.injectAssetsWatch = injectAssetsWatch;

// Compile full output
exports.generate = series(style, copyTemplates, copyAssets, copyStyles, injectAssets);

// Full development workflow
exports.build = series(this.generate, buildServer);
exports.dev = series(this.generate, devServer);
