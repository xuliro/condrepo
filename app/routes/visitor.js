function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}

﻿module.exports = function (app) {
    var visitorController = app.controllers.visitor;

    app.route('/visitors')
        .get(verificaAutenticacao, visitorController.listaVisitors)
        .post(verificaAutenticacao, visitorController.salvaVisitor);

    app.route('/visitors/:id')
        .get(verificaAutenticacao, visitorController.obtemVisitor)
        .delete(verificaAutenticacao, visitorController.removeVisitor);

    app.route('/visitors/event/:id')
        .get(verificaAutenticacao, visitorController.listByEvent);
    app.route('/visitors/unit/:id')
        .get(verificaAutenticacao, visitorController.listByUnit);
};
