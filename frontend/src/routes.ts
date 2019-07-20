import routes from '@yolkai/next-routes'

export default routes()
  .add('user', '/@:screenName/:playStyle?', 'profile')
  .add('map', '/@:screenName/:playStyle/musics/:musicId/:difficulty', 'map')
  .add('musics', '/@:screenName/:playStyle/musics', 'musics')
