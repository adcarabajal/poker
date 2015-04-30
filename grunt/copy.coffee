module.exports = (grunt) ->
  assets:
    files: [
      {
        expand: true
        dest: '<%=config.site.dir%>'
        src: [
          '**/*.*'
          '!scripts/livereload-support.js'
          '!styles/**/*.less', '!**/*.jade'
        ]
        cwd: '<%=config.src.dir%>'
      }, {
        expand: true
        dest: '<%=config.site.dir%>/scripts/libs'
        src: ['**/*.js', '**/*.css', '**/*.woff', '**/*.ttf']
        cwd: 'bower_components'
      },
      {
        expand: true
        dest: '<%=config.site.dir%>/fonts'
        src: ['**/*.woff', '**/*.ttf']
        cwd: 'bower_components/bootstrap/fonts'
      }
    ]

  liveReloadScript:
    dest: '<%=config.site.dir%>/scripts/livereload-support.js'
    src: 'src/scripts/livereload-support.js'
    options:
      process: (content) -> grunt.template.process(content)
