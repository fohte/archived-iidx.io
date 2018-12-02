const routes = require('@yolkai/next-routes')

module.exports = routes().add('user', '/@:screenName', 'profile')
