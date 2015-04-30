module.exports =
  compile:
    files: [
      expand: true
      cwd: '<%=config.site.dir%>'
      src: ['**/*.jade', '!**/_*.jade']
      dest: '<%=config.site.dir%>'
      ext: '.html'
    ]
