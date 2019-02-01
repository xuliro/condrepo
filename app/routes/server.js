function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}

﻿module.exports = function (app) {
    var serverController = app.controllers.server;

    app.route('/servers')
        .get(verificaAutenticacao, serverController.listaServers)
        .post(verificaAutenticacao, serverController.salvaServer);

    app.route('/servers/:id')
        .get(verificaAutenticacao, serverController.obtemServer)
        .delete(verificaAutenticacao, serverController.removeServer);
    
    app.route('/servers/condom/:id')
        .get(verificaAutenticacao, serverController.listByCondom);
};
