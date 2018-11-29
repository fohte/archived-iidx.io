const routes = require('@yolkai/next-routes')

module.exports = routes().add('user', '/@:id', 'profile')
