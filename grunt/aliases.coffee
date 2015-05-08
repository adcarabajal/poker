module.exports =
  site: ['copy:assets', 'jade', 'less']
  default: ['site', 'express:dev', 'watch']
