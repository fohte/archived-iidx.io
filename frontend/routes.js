const routes = require('@yolkai/next-routes')

module.exports = routes()
  .add('user', '/@:screenName', 'profile')
  .add('map', '/@:screenName/musics/:musicId/:playStyle/:difficulty', 'map')
  .add('musics', '/@:screenName/musics', 'musics')
