const gulp = require('gulp');
const babel = require('gulp-babel');

function toJavascript(cb) {
  gulp.src('src/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('js'))
  console.log("CONVERTED TASK COMPLETED")
  cb();
}

module.exports = {
  toJavascript
}