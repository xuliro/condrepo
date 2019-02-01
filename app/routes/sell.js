function verificaAutenticacao(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }else {
    res.status('401').json('Não autorizado');
  }
}

﻿module.exports = function (app) {
    var sellController = app.controllers.sell;

    app.route('/sells')
        .get(verificaAutenticacao, sellController.listaSells)
        .post(verificaAutenticacao, sellController.salvaSell);

    app.route('/sells/:id')
        .get(verificaAutenticacao, sellController.obtemSell)
        .delete(verificaAutenticacao, sellController.removeSell);

    app.route('/sells/condom/:id')
        .get(verificaAutenticacao, sellController.listByCondom);
    app.route('/sells/user/:id')
        .get(verificaAutenticacao, sellController.listByUser);
};
