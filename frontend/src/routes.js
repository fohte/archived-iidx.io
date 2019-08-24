const routes = require('@yolkai/next-routes').default

module.exports = routes()
  .add('user', '/@:screenName/:playStyle?', 'profile')
  .add('map', '/@:screenName/:playStyle/musics/:musicNumber/:difficulty', 'map')
  .add('musics', '/@:screenName/:playStyle/musics', 'musics')
