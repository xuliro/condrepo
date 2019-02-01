function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}

﻿module.exports = function (app) {
    var eventController = app.controllers.event;

    app.route('/events')
        .get(verificaAutenticacao, eventController.listaEvents)
        .post(verificaAutenticacao, eventController.salvaEvent);

    app.route('/events/:id')
        .get(verificaAutenticacao, eventController.obtemEvent)
        .delete(verificaAutenticacao, eventController.removeEvent);

    app.route('/events/user/:id')
        .get(verificaAutenticacao, eventController.listByUser);
    app.route('/events/area/:id')
        .get(verificaAutenticacao, eventController.listByArea);
};
