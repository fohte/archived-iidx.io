import routes from './next-routes'

export default routes()
  .add('user', '/@:screenName/:playStyle?', 'profile')
  .add('map', '/@:screenName/:playStyle/musics/:musicNumber/:difficulty', 'map')
  .add('musics', '/@:screenName/:playStyle/musics', 'musics')
