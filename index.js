const express = require('express');
let app = express();
const path = require('path');
const public = path.join(__dirname, 'static');
let favicon = require('serve-favicon');
let gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node;

app.use('/static', express.static(public));
app.use(favicon(__dirname + '/static/favicon.ico'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/index.html'));
});

gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['index.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
})

gulp.task('default', function() {
  gulp.run('server')

  gulp.watch(['./index.js', './static/**/*.js'], function() {
    gulp.run('server')
  })
})

process.on('exit', function() {
    if (node) node.kill()
})

app.listen(8080);