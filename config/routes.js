module.exports = app => {
  app.post('/signup', app.api.user.save)
  app.post('/signin', app.api.auth.signin)
  app.post('/validateToken', app.api.auth.validateToken)

  app.route('/users')
    .all(app.config.passport.authenticate())
    .post(app.api.user.save)
    .get(app.api.user.get)

  app.route('/users/:id')
    .all(app.config.passport.authenticate())
    .put(app.api.user.save)

  app.route('/members')
    .all(app.config.passport.authenticate())
    .post(app.api.members.save)
    .get(app.api.members.get)

  app.route('/members/:id')
    .all(app.config.passport.authenticate())
    .put(app.api.members.save)
    .delete(app.api.members.remove)

  app.route('/finanInput')
    .all(app.config.passport.authenticate())
    .post(app.api.finan_input.save)
    .get(app.api.finan_input.get)

  app.route('/finanInput/:id')
    .all(app.config.passport.authenticate())
    .put(app.api.finan_input.save)
    .delete(app.api.finan_input.remove)
}